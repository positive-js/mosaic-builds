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
        const totalSeconds = Math.abs(this.adapter.diffNow(date, 'seconds'));
        const totalMinutes = Math.floor(Math.abs(this.adapter.diffNow(date, 'minutes')));
        const isToday = this.adapter.hasSame(this.adapter.today(), date, 'days');
        const isYesterday = this.adapter.diffNow(date, 'days') <= -1 && this.adapter.diffNow(date, 'days') > -2;
        const templateVariables = Object.assign(Object.assign({}, this.adapter.config.variables), template.variables);
        const variables = this.compileVariables(date, templateVariables);
        let newTemplate;
        if (totalSeconds <= 59) { // seconds ago
            variables.SECONDS_PASSED = totalSeconds;
            newTemplate = template.SECONDS_AGO;
        }
        else if (totalMinutes <= 59) { // minutes ago
            variables.MINUTES_PASSED = totalMinutes;
            newTemplate = template.MINUTES_AGO;
        }
        else if (isToday) {
            newTemplate = template.TODAY;
        }
        else if (isYesterday) {
            newTemplate = template.YESTERDAY;
        }
        else { // before yesterday
            newTemplate = template.BEFORE_YESTERDAY;
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
        const variables = this.compileVariables(date, Object.assign(Object.assign({}, this.adapter.config.variables), params.variables));
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
        return this.absoluteDate(date, this.config.absoluteTemplates.short, true, options === null || options === void 0 ? void 0 : options.milliseconds);
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
        return this.absoluteDate(date, this.config.absoluteTemplates.long, true, options === null || options === void 0 ? void 0 : options.milliseconds);
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
        const variables = Object.assign(Object.assign({}, this.adapter.config.variables), template.variables);
        let params = {};
        if (startDate) {
            const startDateVariables = this.compileVariables(startDate, variables);
            params = Object.assign(Object.assign({}, variables), { START_DATE: this.messageFormat.compile(template.START_DATE)(startDateVariables), RANGE_TYPE: 'onlyStart' });
        }
        else if (endDate) {
            const endDateVariables = this.compileVariables(endDate, variables);
            params = Object.assign(Object.assign({}, variables), { END_DATE: this.messageFormat.compile(template.END_DATE)(endDateVariables), RANGE_TYPE: 'onlyEnd' });
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
        const variables = Object.assign(Object.assign({}, this.adapter.config.variables), template.variables);
        let params = {};
        if (startDate) {
            const startDateVariables = this.compileVariables(startDate, variables);
            params = Object.assign(Object.assign({}, variables), { START_DATETIME: this.messageFormat.compile(template.START_DATETIME)(startDateVariables), RANGE_TYPE: 'onlyStart' });
        }
        else if (endDate) {
            const endDateVariables = this.compileVariables(endDate, variables);
            params = Object.assign(Object.assign({}, variables), { END_DATETIME: this.messageFormat.compile(template.END_DATETIME)(endDateVariables), RANGE_TYPE: 'onlyEnd' });
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
        const variables = Object.assign(Object.assign({}, this.adapter.config.variables), template.variables);
        const sameMonth = this.hasSame(startDate, endDate, 'month');
        const startDateVariables = this.compileVariables(startDate, variables);
        startDateVariables.SAME_MONTH = sameMonth;
        const endDateVariables = this.compileVariables(endDate, variables);
        endDateVariables.SAME_MONTH = sameMonth;
        const bothCurrentYear = startDateVariables.CURRENT_YEAR === 'yes' && endDateVariables.CURRENT_YEAR === 'yes';
        startDateVariables.CURRENT_YEAR = bothCurrentYear ? 'yes' : 'no';
        endDateVariables.CURRENT_YEAR = bothCurrentYear ? 'yes' : 'no';
        const params = Object.assign(Object.assign({}, variables), { START_DATE: this.messageFormat.compile(template.START_DATE)(startDateVariables), END_DATE: this.messageFormat.compile(template.END_DATE)(endDateVariables), SAME_MONTH: sameMonth });
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
        const variables = Object.assign(Object.assign({}, this.adapter.config.variables), template.variables);
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
        const params = Object.assign(Object.assign({}, variables), { START_DATETIME: this.messageFormat.compile(template.START_DATETIME)(startDateVariables), END_DATETIME: this.messageFormat.compile(template.END_DATETIME)(endDateVariables), SAME_MONTH: sameMonth, SAME_DAY: sameDay });
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
/** @nocollapse */ DateFormatter.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.13", ngImport: i0, type: DateFormatter, deps: [{ token: i1.DateAdapter }, { token: MC_DATE_LOCALE }], target: i0.ɵɵFactoryTarget.Injectable });
/** @nocollapse */ DateFormatter.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.2.13", ngImport: i0, type: DateFormatter });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.13", ngImport: i0, type: DateFormatter, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.DateAdapter }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [MC_DATE_LOCALE]
                }] }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybWF0dGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvbW9zYWljL2NvcmUvZm9ybWF0dGVycy9kYXRlL2Zvcm1hdHRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxrQ0FBa0M7QUFDbEMsT0FBTyxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDbkQsNkJBQTZCO0FBQzdCLE9BQU8sYUFBYSxNQUFNLHFCQUFxQixDQUFDO0FBQ2hELE9BQU8sRUFBRSxXQUFXLEVBQUUsY0FBYyxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFFdkUsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ3pDLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQzs7O0FBc0V6QyxNQUFNLE9BQU8sYUFBYTtJQU90QixZQUNxQixPQUF1QixFQUNoQixNQUFjO1FBRHJCLFlBQU8sR0FBUCxPQUFPLENBQWdCO1FBTDNCLHlCQUFvQixHQUFXLGNBQWMsQ0FBQztRQVEzRCxJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO1FBRTVDLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxhQUFhLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDbkQsQ0FBQztJQUVELFNBQVMsQ0FBQyxNQUFjO1FBQ3BCLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7UUFFNUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDbkMsQ0FBQztJQUVEOzs7O09BSUc7SUFDSCxZQUFZLENBQUMsSUFBTyxFQUFFLFFBQW1DO1FBQ3JELElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsRUFBRTtZQUFFLE1BQU0sSUFBSSxLQUFLLENBQUMsSUFBSSxDQUFDLG9CQUFvQixDQUFDLENBQUM7U0FBRTtRQUV2RixNQUFNLFlBQVksR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxTQUFTLENBQUMsQ0FBQyxDQUFDO1FBQ3JFLE1BQU0sWUFBWSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRWpGLE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQ3pFLE1BQU0sV0FBVyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFFeEcsTUFBTSxpQkFBaUIsbUNBQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsU0FBUyxHQUFLLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUNwRixNQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxFQUFFLGlCQUFpQixDQUFDLENBQUM7UUFDakUsSUFBSSxXQUFXLENBQUM7UUFFaEIsSUFBSSxZQUFZLElBQUksRUFBRSxFQUFFLEVBQUUsY0FBYztZQUNwQyxTQUFTLENBQUMsY0FBYyxHQUFHLFlBQVksQ0FBQztZQUN4QyxXQUFXLEdBQUcsUUFBUSxDQUFDLFdBQVcsQ0FBQztTQUN0QzthQUFNLElBQUksWUFBWSxJQUFJLEVBQUUsRUFBRSxFQUFFLGNBQWM7WUFDM0MsU0FBUyxDQUFDLGNBQWMsR0FBRyxZQUFZLENBQUM7WUFDeEMsV0FBVyxHQUFHLFFBQVEsQ0FBQyxXQUFXLENBQUM7U0FDdEM7YUFBTSxJQUFJLE9BQU8sRUFBRTtZQUNoQixXQUFXLEdBQUcsUUFBUSxDQUFDLEtBQUssQ0FBQztTQUNoQzthQUFNLElBQUksV0FBVyxFQUFFO1lBQ3BCLFdBQVcsR0FBRyxRQUFRLENBQUMsU0FBUyxDQUFDO1NBQ3BDO2FBQU0sRUFBRSxtQkFBbUI7WUFDeEIsV0FBVyxHQUFHLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQztTQUMzQztRQUVELE9BQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDOUQsQ0FBQztJQUVEOzs7T0FHRztJQUNILGlCQUFpQixDQUFDLElBQU87UUFDckIsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLGlCQUFpQixDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3hFLENBQUM7SUFFRDs7O09BR0c7SUFDSCxnQkFBZ0IsQ0FBQyxJQUFPO1FBQ3BCLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUN2RSxDQUFDO0lBRUQ7Ozs7OztPQU1HO0lBQ0gsWUFBWSxDQUNSLElBQU8sRUFDUCxNQUFpQyxFQUNqQyxRQUFRLEdBQUcsS0FBSyxFQUNoQixZQUFZLEdBQUcsS0FBSztRQUVwQixJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFBRSxNQUFNLElBQUksS0FBSyxDQUFDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO1NBQUU7UUFFdkYsTUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksa0NBQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsU0FBUyxHQUFLLE1BQU0sQ0FBQyxTQUFTLEVBQUcsQ0FBQztRQUV6RyxTQUFTLENBQUMsaUJBQWlCLEdBQUcsWUFBWSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztRQUUxRCxNQUFNLFFBQVEsR0FBRyxRQUFRLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUM7UUFFMUQsT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUMzRCxDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsaUJBQWlCLENBQUMsSUFBTztRQUNyQixPQUFPLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsaUJBQWlCLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDeEUsQ0FBQztJQUVEOzs7O09BSUc7SUFDSCxxQkFBcUIsQ0FBQyxJQUFPLEVBQUUsT0FBaUM7UUFDNUQsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLGlCQUFpQixDQUFDLEtBQUssRUFBRSxJQUFJLEVBQUUsT0FBTyxhQUFQLE9BQU8sdUJBQVAsT0FBTyxDQUFFLFlBQVksQ0FBQyxDQUFDO0lBQ3JHLENBQUM7SUFFRDs7O09BR0c7SUFDSCxnQkFBZ0IsQ0FBQyxJQUFPO1FBQ3BCLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUN2RSxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNILG9CQUFvQixDQUFDLElBQU8sRUFBRSxPQUFpQztRQUMzRCxPQUFPLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsaUJBQWlCLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxPQUFPLGFBQVAsT0FBTyx1QkFBUCxPQUFPLENBQUUsWUFBWSxDQUFDLENBQUM7SUFDcEcsQ0FBQztJQUVEOzs7OztPQUtHO0lBQ0gsZUFBZSxDQUFDLFNBQW1CLEVBQUUsT0FBaUIsRUFBRSxRQUFnQztRQUNwRixJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsRUFBRTtZQUNsRixNQUFNLElBQUksS0FBSyxDQUFDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO1NBQzlDO1FBRUQsTUFBTSxTQUFTLG1DQUFRLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLFNBQVMsR0FBSyxRQUFRLENBQUMsU0FBUyxDQUFFLENBQUM7UUFDOUUsSUFBSSxNQUFNLEdBQUcsRUFBRSxDQUFDO1FBRWhCLElBQUksU0FBUyxFQUFFO1lBQ1gsTUFBTSxrQkFBa0IsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsU0FBUyxFQUFFLFNBQVMsQ0FBQyxDQUFDO1lBRXZFLE1BQU0sbUNBQ0MsU0FBUyxLQUNaLFVBQVUsRUFBRSxJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLENBQUMsa0JBQWtCLENBQUMsRUFDL0UsVUFBVSxFQUFFLFdBQVcsR0FDMUIsQ0FBQztTQUNMO2FBQU0sSUFBSSxPQUFPLEVBQUU7WUFDaEIsTUFBTSxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLFNBQVMsQ0FBQyxDQUFDO1lBRW5FLE1BQU0sbUNBQ0MsU0FBUyxLQUNaLFFBQVEsRUFBRSxJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUMsZ0JBQWdCLENBQUMsRUFDekUsVUFBVSxFQUFFLFNBQVMsR0FDeEIsQ0FBQztTQUNMO1FBRUQsT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDN0QsQ0FBQztJQUVEOzs7OztPQUtHO0lBQ0gsbUJBQW1CLENBQUMsU0FBbUIsRUFBRSxPQUFpQixFQUFFLFFBQWdDO1FBQ3hGLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxFQUFFO1lBQ2xGLE1BQU0sSUFBSSxLQUFLLENBQUMsSUFBSSxDQUFDLG9CQUFvQixDQUFDLENBQUM7U0FDOUM7UUFFRCxNQUFNLFNBQVMsbUNBQVEsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsU0FBUyxHQUFLLFFBQVEsQ0FBQyxTQUFTLENBQUUsQ0FBQztRQUM5RSxJQUFJLE1BQU0sR0FBRyxFQUFFLENBQUM7UUFFaEIsSUFBSSxTQUFTLEVBQUU7WUFDWCxNQUFNLGtCQUFrQixHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTLEVBQUUsU0FBUyxDQUFDLENBQUM7WUFFdkUsTUFBTSxtQ0FDQyxTQUFTLEtBQ1osY0FBYyxFQUFFLElBQUksQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxjQUFjLENBQUMsQ0FBQyxrQkFBa0IsQ0FBQyxFQUN2RixVQUFVLEVBQUUsV0FBVyxHQUMxQixDQUFDO1NBQ0w7YUFBTSxJQUFJLE9BQU8sRUFBRTtZQUNoQixNQUFNLGdCQUFnQixHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsU0FBUyxDQUFDLENBQUM7WUFFbkUsTUFBTSxtQ0FDQyxTQUFTLEtBQ1osWUFBWSxFQUFFLElBQUksQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxZQUFZLENBQUMsQ0FBQyxnQkFBZ0IsQ0FBQyxFQUNqRixVQUFVLEVBQUUsU0FBUyxHQUN4QixDQUFDO1NBQ0w7UUFFRCxPQUFPLElBQUksQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNqRSxDQUFDO0lBRUQ7Ozs7O09BS0c7SUFDSCxTQUFTLENBQUMsU0FBWSxFQUFFLE9BQVUsRUFBRSxRQUFnQztRQUNoRSxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsRUFBRTtZQUNsRixNQUFNLElBQUksS0FBSyxDQUFDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO1NBQzlDO1FBRUQsTUFBTSxTQUFTLG1DQUFRLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLFNBQVMsR0FBSyxRQUFRLENBQUMsU0FBUyxDQUFFLENBQUM7UUFDOUUsTUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUUsT0FBTyxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBRTVELE1BQU0sa0JBQWtCLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFNBQVMsRUFBRSxTQUFTLENBQUMsQ0FBQztRQUN2RSxrQkFBa0IsQ0FBQyxVQUFVLEdBQUcsU0FBUyxDQUFDO1FBRTFDLE1BQU0sZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxTQUFTLENBQUMsQ0FBQztRQUNuRSxnQkFBZ0IsQ0FBQyxVQUFVLEdBQUcsU0FBUyxDQUFDO1FBRXhDLE1BQU0sZUFBZSxHQUFHLGtCQUFrQixDQUFDLFlBQVksS0FBSyxLQUFLLElBQUksZ0JBQWdCLENBQUMsWUFBWSxLQUFLLEtBQUssQ0FBQztRQUM3RyxrQkFBa0IsQ0FBQyxZQUFZLEdBQUcsZUFBZSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztRQUNqRSxnQkFBZ0IsQ0FBQyxZQUFZLEdBQUcsZUFBZSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztRQUUvRCxNQUFNLE1BQU0sbUNBQ0wsU0FBUyxLQUNaLFVBQVUsRUFBRSxJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLENBQUMsa0JBQWtCLENBQUMsRUFDL0UsUUFBUSxFQUFFLElBQUksQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQyxnQkFBZ0IsQ0FBQyxFQUN6RSxVQUFVLEVBQUUsU0FBUyxHQUN4QixDQUFDO1FBRUYsT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDN0QsQ0FBQztJQUVEOzs7OztPQUtHO0lBQ0gsYUFBYSxDQUFDLFNBQVksRUFBRSxPQUFVLEVBQUUsUUFBZ0M7UUFDcEUsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLEVBQUU7WUFDbEYsTUFBTSxJQUFJLEtBQUssQ0FBQyxJQUFJLENBQUMsb0JBQW9CLENBQUMsQ0FBQztTQUM5QztRQUVELE1BQU0sU0FBUyxtQ0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxTQUFTLEdBQUssUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQzVFLE1BQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFFLE9BQU8sRUFBRSxPQUFPLENBQUMsQ0FBQztRQUM1RCxNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRSxPQUFPLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFFeEQsTUFBTSxrQkFBa0IsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsU0FBUyxFQUFFLFNBQVMsQ0FBQyxDQUFDO1FBQ3ZFLGtCQUFrQixDQUFDLFVBQVUsR0FBRyxTQUFTLENBQUM7UUFDMUMsa0JBQWtCLENBQUMsUUFBUSxHQUFHLE9BQU8sQ0FBQztRQUV0QyxNQUFNLGdCQUFnQixHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsU0FBUyxDQUFDLENBQUM7UUFDbkUsZ0JBQWdCLENBQUMsVUFBVSxHQUFHLFNBQVMsQ0FBQztRQUN4QyxnQkFBZ0IsQ0FBQyxRQUFRLEdBQUcsT0FBTyxDQUFDO1FBRXBDLE1BQU0sZUFBZSxHQUFHLGtCQUFrQixDQUFDLFlBQVksS0FBSyxLQUFLLElBQUksZ0JBQWdCLENBQUMsWUFBWSxLQUFLLEtBQUssQ0FBQztRQUM3RyxrQkFBa0IsQ0FBQyxZQUFZLEdBQUcsZUFBZSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztRQUNqRSxnQkFBZ0IsQ0FBQyxZQUFZLEdBQUcsZUFBZSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztRQUUvRCxNQUFNLE1BQU0sbUNBQ0wsU0FBUyxLQUNaLGNBQWMsRUFBRSxJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsY0FBYyxDQUFDLENBQUMsa0JBQWtCLENBQUMsRUFDdkYsWUFBWSxFQUFFLElBQUksQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxZQUFZLENBQUMsQ0FBQyxnQkFBZ0IsQ0FBQyxFQUNqRixVQUFVLEVBQUUsU0FBUyxFQUNyQixRQUFRLEVBQUUsT0FBTyxHQUNwQixDQUFDO1FBRUYsT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDakUsQ0FBQztJQUVEOzs7O09BSUc7SUFDSCxjQUFjLENBQUMsU0FBbUIsRUFBRSxPQUFXO1FBQzNDLE1BQU0sY0FBYyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUFDO1FBRWxELElBQUksU0FBUyxJQUFJLE9BQU8sRUFBRTtZQUN0QixPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxFQUFFLE9BQU8sRUFBRSxjQUFjLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQy9FO1FBRUQsT0FBTyxJQUFJLENBQUMsZUFBZSxDQUFDLFNBQVMsRUFBRSxPQUFPLElBQUksSUFBSSxFQUFFLGNBQWMsQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDOUYsQ0FBQztJQUVEOzs7O09BSUc7SUFDSCxrQkFBa0IsQ0FBQyxTQUFtQixFQUFFLE9BQVc7UUFDL0MsTUFBTSxjQUFjLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUM7UUFFbEQsSUFBSSxTQUFTLElBQUksT0FBTyxFQUFFO1lBQ3RCLE9BQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQyxTQUFTLEVBQUUsT0FBTyxFQUFFLGNBQWMsQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDbkY7UUFFRCxPQUFPLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxTQUFTLEVBQUUsT0FBTyxJQUFJLElBQUksRUFBRSxjQUFjLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ2xHLENBQUM7SUFFRDs7OztPQUlHO0lBQ0gsYUFBYSxDQUFDLFNBQW1CLEVBQUUsT0FBVztRQUMxQyxNQUFNLGNBQWMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQztRQUVsRCxJQUFJLFNBQVMsSUFBSSxPQUFPLEVBQUU7WUFDdEIsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsRUFBRSxPQUFPLEVBQUUsY0FBYyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUM5RTtRQUVELE9BQU8sSUFBSSxDQUFDLGVBQWUsQ0FBQyxTQUFTLEVBQUUsT0FBTyxJQUFJLElBQUksRUFBRSxjQUFjLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzdGLENBQUM7SUFFRDs7OztPQUlHO0lBQ0gsaUJBQWlCLENBQUMsU0FBbUIsRUFBRSxPQUFXO1FBQzlDLE1BQU0sY0FBYyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUFDO1FBRWxELElBQUksU0FBUyxJQUFJLE9BQU8sRUFBRTtZQUN0QixPQUFPLElBQUksQ0FBQyxhQUFhLENBQUMsU0FBUyxFQUFFLE9BQU8sRUFBRSxjQUFjLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQ2xGO1FBRUQsT0FBTyxJQUFJLENBQUMsbUJBQW1CLENBQUMsU0FBUyxFQUFFLE9BQU8sSUFBSSxJQUFJLEVBQUUsY0FBYyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNqRyxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNILG1CQUFtQixDQUFDLFNBQVksRUFBRSxPQUFVO1FBQ3hDLE9BQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQyxTQUFTLEVBQUUsT0FBTyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNqRyxDQUFDO0lBRU8sZ0JBQWdCLENBQUMsSUFBTyxFQUFFLFNBQWM7UUFDNUMsTUFBTSxpQkFBaUIsR0FBUSxFQUFFLENBQUM7UUFFbEMscUNBQXFDO1FBQ3JDLEtBQUssTUFBTSxHQUFHLElBQUksU0FBUyxFQUFFO1lBQ3pCLElBQUksQ0FBQyxTQUFTLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxFQUFFO2dCQUFFLFNBQVM7YUFBRTtZQUVqRCxNQUFNLEtBQUssR0FBRyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDN0IsaUJBQWlCLENBQUMsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDO1NBQzdEO1FBRUQsaUJBQWlCLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFFbEYsT0FBTyxpQkFBaUIsQ0FBQztJQUM3QixDQUFDO0lBRU8sT0FBTyxDQUFDLFNBQVksRUFBRSxPQUFVLEVBQUUsSUFBWTtRQUNsRCxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO0lBQ3pFLENBQUM7OzhIQXhXUSxhQUFhLDZDQVNWLGNBQWM7a0lBVGpCLGFBQWE7NEZBQWIsYUFBYTtrQkFEekIsVUFBVTs7MEJBVUYsTUFBTTsyQkFBQyxjQUFjIiwic291cmNlc0NvbnRlbnQiOlsiLy8gdHNsaW50OmRpc2FibGU6bm8tbWFnaWMtbnVtYmVyc1xuaW1wb3J0IHsgSW5qZWN0LCBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG4vLyB0c2xpbnQ6ZGlzYWJsZTppbXBvcnQtbmFtZVxuaW1wb3J0IE1lc3NhZ2VGb3JtYXQgZnJvbSAnQG1lc3NhZ2Vmb3JtYXQvY29yZSc7XG5pbXBvcnQgeyBEYXRlQWRhcHRlciwgTUNfREFURV9MT0NBTEUgfSBmcm9tICdAcHRzZWN1cml0eS9jZGsvZGF0ZXRpbWUnO1xuXG5pbXBvcnQgeyBlblVTIH0gZnJvbSAnLi90ZW1wbGF0ZXMvZW4tVVMnO1xuaW1wb3J0IHsgcnVSVSB9IGZyb20gJy4vdGVtcGxhdGVzL3J1LVJVJztcblxuXG4vKipcbiAqIGludGVyZmFjZSBmb3IgYWJzb2x1dGUgZGF0ZSBvciBkYXRldGltZSBmb3JtYXR0ZXIgdGVtcGxhdGVcbiAqL1xuLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5hbWluZy1jb252ZW50aW9uXG5leHBvcnQgaW50ZXJmYWNlIEZvcm1hdHRlckFic29sdXRlVGVtcGxhdGUge1xuICAgIHZhcmlhYmxlcz86IHsgW25hbWU6IHN0cmluZ106IHN0cmluZyB9O1xuICAgIERBVEU6IHN0cmluZztcbiAgICBEQVRFVElNRTogc3RyaW5nO1xufVxuXG4vKipcbiAqIGludGVyZmFjZSBmb3IgcmFuZ2UgZGF0ZSBvciBkYXRldGltZSBmb3JtYXR0ZXIgdGVtcGxhdGVcbiAqL1xuLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5hbWluZy1jb252ZW50aW9uXG5leHBvcnQgaW50ZXJmYWNlIEZvcm1hdHRlclJhbmdlVGVtcGxhdGUge1xuICAgIHZhcmlhYmxlcz86IHsgW25hbWU6IHN0cmluZ106IHN0cmluZyB9O1xuICAgIFNUQVJUX0RBVEU6IHN0cmluZztcbiAgICBFTkRfREFURTogc3RyaW5nO1xuICAgIERBVEU6IHN0cmluZztcbiAgICBTVEFSVF9EQVRFVElNRTogc3RyaW5nO1xuICAgIEVORF9EQVRFVElNRTogc3RyaW5nO1xuICAgIERBVEVUSU1FOiBzdHJpbmc7XG59XG5cbi8qKlxuICogaW50ZXJmYWNlIGZvciByZWxhdGl2ZSBkYXRlIG9yIGRhdGV0aW1lIGZvcm1hdHRlciB0ZW1wbGF0ZVxuICovXG4vLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bmFtaW5nLWNvbnZlbnRpb25cbmV4cG9ydCBpbnRlcmZhY2UgRm9ybWF0dGVyUmVsYXRpdmVUZW1wbGF0ZSB7XG4gICAgdmFyaWFibGVzPzogeyBbbmFtZTogc3RyaW5nXTogc3RyaW5nIH07XG4gICAgU0VDT05EU19BR086IHN0cmluZztcbiAgICBNSU5VVEVTX0FHTzogc3RyaW5nO1xuICAgIFRPREFZOiBzdHJpbmc7XG4gICAgWUVTVEVSREFZOiBzdHJpbmc7XG4gICAgQkVGT1JFX1lFU1RFUkRBWTogc3RyaW5nO1xufVxuXG4vLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bmFtaW5nLWNvbnZlbnRpb25cbmV4cG9ydCBpbnRlcmZhY2UgQWJzb2x1dGVEYXRlVGltZU9wdGlvbnMge1xuICAgIG1pbGxpc2Vjb25kcz86IGJvb2xlYW47XG59XG5cbi8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuYW1pbmctY29udmVudGlvblxuZXhwb3J0IGludGVyZmFjZSBGb3JtYXR0ZXJDb25maWcge1xuICAgIHJlbGF0aXZlVGVtcGxhdGVzOiB7XG4gICAgICAgIHNob3J0OiBGb3JtYXR0ZXJSZWxhdGl2ZVRlbXBsYXRlO1xuICAgICAgICBsb25nOiBGb3JtYXR0ZXJSZWxhdGl2ZVRlbXBsYXRlO1xuICAgIH07XG4gICAgYWJzb2x1dGVUZW1wbGF0ZXM6IHtcbiAgICAgICAgc2hvcnQ6IEZvcm1hdHRlckFic29sdXRlVGVtcGxhdGU7XG4gICAgICAgIGxvbmc6IEZvcm1hdHRlckFic29sdXRlVGVtcGxhdGU7XG4gICAgfTtcbiAgICByYW5nZVRlbXBsYXRlczoge1xuICAgICAgICBjbG9zZWRSYW5nZToge1xuICAgICAgICAgICAgc2hvcnQ6IEZvcm1hdHRlclJhbmdlVGVtcGxhdGU7XG4gICAgICAgICAgICBtaWRkbGU6IEZvcm1hdHRlclJhbmdlVGVtcGxhdGU7XG4gICAgICAgICAgICBsb25nOiBGb3JtYXR0ZXJSYW5nZVRlbXBsYXRlO1xuICAgICAgICB9O1xuICAgICAgICBvcGVuZWRSYW5nZToge1xuICAgICAgICAgICAgc2hvcnQ6IEZvcm1hdHRlclJhbmdlVGVtcGxhdGU7XG4gICAgICAgICAgICBsb25nOiBGb3JtYXR0ZXJSYW5nZVRlbXBsYXRlO1xuICAgICAgICB9O1xuICAgIH07XG59XG5cblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIERhdGVGb3JtYXR0ZXI8RD4ge1xuICAgIGNvbmZpZzogRm9ybWF0dGVyQ29uZmlnO1xuXG4gICAgcHJpdmF0ZSByZWFkb25seSBpbnZhbGlkRGF0ZUVycm9yVGV4dDogc3RyaW5nID0gJ0ludmFsaWQgZGF0ZSc7XG5cbiAgICBwcml2YXRlIG1lc3NhZ2VGb3JtYXQ6IE1lc3NhZ2VGb3JtYXQ7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBhZGFwdGVyOiBEYXRlQWRhcHRlcjxEPixcbiAgICAgICAgQEluamVjdChNQ19EQVRFX0xPQ0FMRSkgbG9jYWxlOiBzdHJpbmdcbiAgICApIHtcbiAgICAgICAgdGhpcy5jb25maWcgPSBsb2NhbGUgPT09ICdlbicgPyBlblVTIDogcnVSVTtcblxuICAgICAgICB0aGlzLm1lc3NhZ2VGb3JtYXQgPSBuZXcgTWVzc2FnZUZvcm1hdChsb2NhbGUpO1xuICAgIH1cblxuICAgIHNldExvY2FsZShsb2NhbGU6IHN0cmluZyk6IHZvaWQge1xuICAgICAgICB0aGlzLmNvbmZpZyA9IGxvY2FsZSA9PT0gJ2VuJyA/IGVuVVMgOiBydVJVO1xuXG4gICAgICAgIHRoaXMuYWRhcHRlci5zZXRMb2NhbGUobG9jYWxlKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gZGF0ZSAtIGRhdGVcbiAgICAgKiBAcGFyYW0gdGVtcGxhdGUgLSB0ZW1wbGF0ZVxuICAgICAqIEByZXR1cm5zIHJlbGF0aXZlIGRhdGUgYnkgdGVtcGxhdGVcbiAgICAgKi9cbiAgICByZWxhdGl2ZURhdGUoZGF0ZTogRCwgdGVtcGxhdGU6IEZvcm1hdHRlclJlbGF0aXZlVGVtcGxhdGUpOiBzdHJpbmcge1xuICAgICAgICBpZiAoIXRoaXMuYWRhcHRlci5pc0RhdGVJbnN0YW5jZShkYXRlKSkgeyB0aHJvdyBuZXcgRXJyb3IodGhpcy5pbnZhbGlkRGF0ZUVycm9yVGV4dCk7IH1cblxuICAgICAgICBjb25zdCB0b3RhbFNlY29uZHMgPSBNYXRoLmFicyh0aGlzLmFkYXB0ZXIuZGlmZk5vdyhkYXRlLCAnc2Vjb25kcycpKTtcbiAgICAgICAgY29uc3QgdG90YWxNaW51dGVzID0gTWF0aC5mbG9vcihNYXRoLmFicyh0aGlzLmFkYXB0ZXIuZGlmZk5vdyhkYXRlLCAnbWludXRlcycpKSk7XG5cbiAgICAgICAgY29uc3QgaXNUb2RheSA9IHRoaXMuYWRhcHRlci5oYXNTYW1lKHRoaXMuYWRhcHRlci50b2RheSgpLCBkYXRlLCAnZGF5cycpO1xuICAgICAgICBjb25zdCBpc1llc3RlcmRheSA9IHRoaXMuYWRhcHRlci5kaWZmTm93KGRhdGUsICdkYXlzJykgPD0gLTEgJiYgdGhpcy5hZGFwdGVyLmRpZmZOb3coZGF0ZSwgJ2RheXMnKSA+IC0yO1xuXG4gICAgICAgIGNvbnN0IHRlbXBsYXRlVmFyaWFibGVzID0gey4uLnRoaXMuYWRhcHRlci5jb25maWcudmFyaWFibGVzLCAuLi50ZW1wbGF0ZS52YXJpYWJsZXN9O1xuICAgICAgICBjb25zdCB2YXJpYWJsZXMgPSB0aGlzLmNvbXBpbGVWYXJpYWJsZXMoZGF0ZSwgdGVtcGxhdGVWYXJpYWJsZXMpO1xuICAgICAgICBsZXQgbmV3VGVtcGxhdGU7XG5cbiAgICAgICAgaWYgKHRvdGFsU2Vjb25kcyA8PSA1OSkgeyAvLyBzZWNvbmRzIGFnb1xuICAgICAgICAgICAgdmFyaWFibGVzLlNFQ09ORFNfUEFTU0VEID0gdG90YWxTZWNvbmRzO1xuICAgICAgICAgICAgbmV3VGVtcGxhdGUgPSB0ZW1wbGF0ZS5TRUNPTkRTX0FHTztcbiAgICAgICAgfSBlbHNlIGlmICh0b3RhbE1pbnV0ZXMgPD0gNTkpIHsgLy8gbWludXRlcyBhZ29cbiAgICAgICAgICAgIHZhcmlhYmxlcy5NSU5VVEVTX1BBU1NFRCA9IHRvdGFsTWludXRlcztcbiAgICAgICAgICAgIG5ld1RlbXBsYXRlID0gdGVtcGxhdGUuTUlOVVRFU19BR087XG4gICAgICAgIH0gZWxzZSBpZiAoaXNUb2RheSkge1xuICAgICAgICAgICAgbmV3VGVtcGxhdGUgPSB0ZW1wbGF0ZS5UT0RBWTtcbiAgICAgICAgfSBlbHNlIGlmIChpc1llc3RlcmRheSkge1xuICAgICAgICAgICAgbmV3VGVtcGxhdGUgPSB0ZW1wbGF0ZS5ZRVNURVJEQVk7XG4gICAgICAgIH0gZWxzZSB7IC8vIGJlZm9yZSB5ZXN0ZXJkYXlcbiAgICAgICAgICAgIG5ld1RlbXBsYXRlID0gdGVtcGxhdGUuQkVGT1JFX1lFU1RFUkRBWTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzLm1lc3NhZ2VGb3JtYXQuY29tcGlsZShuZXdUZW1wbGF0ZSkodmFyaWFibGVzKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gZGF0ZSAtIGRhdGVcbiAgICAgKiBAcmV0dXJucyByZWxhdGl2ZSBkYXRlIGluIHNob3J0IGZvcm1hdFxuICAgICAqL1xuICAgIHJlbGF0aXZlU2hvcnREYXRlKGRhdGU6IEQpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5yZWxhdGl2ZURhdGUoZGF0ZSwgdGhpcy5jb25maWcucmVsYXRpdmVUZW1wbGF0ZXMuc2hvcnQpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSBkYXRlIC0gZGF0ZVxuICAgICAqIEByZXR1cm5zIHJlbGF0aXZlIGRhdGUgaW4gbG9uZyBmb3JtYXRcbiAgICAgKi9cbiAgICByZWxhdGl2ZUxvbmdEYXRlKGRhdGU6IEQpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5yZWxhdGl2ZURhdGUoZGF0ZSwgdGhpcy5jb25maWcucmVsYXRpdmVUZW1wbGF0ZXMubG9uZyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIGRhdGUgLSBkYXRlXG4gICAgICogQHBhcmFtIHBhcmFtcyAtIHBhcmFtZXRlcnNcbiAgICAgKiBAcGFyYW0gZGF0ZXRpbWUgLSBzaG91bGQgdGltZSBiZSBzaG93biBhcyB3ZWxsXG4gICAgICogQHBhcmFtIG1pbGxpc2Vjb25kcyAtIHNob3VsZCB0aW1lIHdpdGggbWlsbGlzZWNvbmRzIGJlIHNob3duIGFzIHdlbGxcbiAgICAgKiBAcmV0dXJucyBhYnNvbHV0ZSBkYXRlIGluIGNvbW1vbiBmb3JtYXRcbiAgICAgKi9cbiAgICBhYnNvbHV0ZURhdGUoXG4gICAgICAgIGRhdGU6IEQsXG4gICAgICAgIHBhcmFtczogRm9ybWF0dGVyQWJzb2x1dGVUZW1wbGF0ZSxcbiAgICAgICAgZGF0ZXRpbWUgPSBmYWxzZSxcbiAgICAgICAgbWlsbGlzZWNvbmRzID0gZmFsc2VcbiAgICApOiBzdHJpbmcge1xuICAgICAgICBpZiAoIXRoaXMuYWRhcHRlci5pc0RhdGVJbnN0YW5jZShkYXRlKSkgeyB0aHJvdyBuZXcgRXJyb3IodGhpcy5pbnZhbGlkRGF0ZUVycm9yVGV4dCk7IH1cblxuICAgICAgICBjb25zdCB2YXJpYWJsZXMgPSB0aGlzLmNvbXBpbGVWYXJpYWJsZXMoZGF0ZSwgeyAuLi50aGlzLmFkYXB0ZXIuY29uZmlnLnZhcmlhYmxlcywgLi4ucGFyYW1zLnZhcmlhYmxlcyB9KTtcblxuICAgICAgICB2YXJpYWJsZXMuU0hPV19NSUxMSVNFQ09ORFMgPSBtaWxsaXNlY29uZHMgPyAneWVzJyA6ICdubyc7XG5cbiAgICAgICAgY29uc3QgdGVtcGxhdGUgPSBkYXRldGltZSA/IHBhcmFtcy5EQVRFVElNRSA6IHBhcmFtcy5EQVRFO1xuXG4gICAgICAgIHJldHVybiB0aGlzLm1lc3NhZ2VGb3JtYXQuY29tcGlsZSh0ZW1wbGF0ZSkodmFyaWFibGVzKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gZGF0ZSAtIGRhdGVcbiAgICAgKiBAcmV0dXJucyBhYnNvbHV0ZSBkYXRlIGluIHNob3J0IGZvcm1hdFxuICAgICAqL1xuICAgIGFic29sdXRlU2hvcnREYXRlKGRhdGU6IEQpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5hYnNvbHV0ZURhdGUoZGF0ZSwgdGhpcy5jb25maWcuYWJzb2x1dGVUZW1wbGF0ZXMuc2hvcnQpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSBkYXRlIC0gZGF0ZVxuICAgICAqIEBwYXJhbSBvcHRpb25zIC0gQWJzb2x1dGVEYXRlVGltZU9wdGlvbnNcbiAgICAgKiBAcmV0dXJucyBhYnNvbHV0ZSBkYXRlIGluIHNob3J0IGZvcm1hdCB3aXRoIHRpbWVcbiAgICAgKi9cbiAgICBhYnNvbHV0ZVNob3J0RGF0ZVRpbWUoZGF0ZTogRCwgb3B0aW9ucz86IEFic29sdXRlRGF0ZVRpbWVPcHRpb25zKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYWJzb2x1dGVEYXRlKGRhdGUsIHRoaXMuY29uZmlnLmFic29sdXRlVGVtcGxhdGVzLnNob3J0LCB0cnVlLCBvcHRpb25zPy5taWxsaXNlY29uZHMpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSBkYXRlIC0gZGF0ZVxuICAgICAqIEByZXR1cm5zIGFic29sdXRlIGRhdGUgaW4gbG9uZyBmb3JtYXRcbiAgICAgKi9cbiAgICBhYnNvbHV0ZUxvbmdEYXRlKGRhdGU6IEQpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5hYnNvbHV0ZURhdGUoZGF0ZSwgdGhpcy5jb25maWcuYWJzb2x1dGVUZW1wbGF0ZXMubG9uZyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIGRhdGUgLSBkYXRlXG4gICAgICogQHBhcmFtIG9wdGlvbnMgLSBBYnNvbHV0ZURhdGVUaW1lT3B0aW9uc1xuICAgICAqIEByZXR1cm5zIGFic29sdXRlIGRhdGUgaW4gbG9uZyBmb3JtYXQgd2l0aCB0aW1lXG4gICAgICovXG4gICAgYWJzb2x1dGVMb25nRGF0ZVRpbWUoZGF0ZTogRCwgb3B0aW9ucz86IEFic29sdXRlRGF0ZVRpbWVPcHRpb25zKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYWJzb2x1dGVEYXRlKGRhdGUsIHRoaXMuY29uZmlnLmFic29sdXRlVGVtcGxhdGVzLmxvbmcsIHRydWUsIG9wdGlvbnM/Lm1pbGxpc2Vjb25kcyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHN0YXJ0RGF0ZSAtIHN0YXJ0IGRhdGVcbiAgICAgKiBAcGFyYW0gZW5kRGF0ZSAtIGVuZCBkYXRlXG4gICAgICogQHBhcmFtIHRlbXBsYXRlIC0gdGVtcGxhdGVcbiAgICAgKiBAcmV0dXJucyBvcGVuZWQgZGF0ZVxuICAgICAqL1xuICAgIG9wZW5lZFJhbmdlRGF0ZShzdGFydERhdGU6IEQgfCBudWxsLCBlbmREYXRlOiBEIHwgbnVsbCwgdGVtcGxhdGU6IEZvcm1hdHRlclJhbmdlVGVtcGxhdGUpIHtcbiAgICAgICAgaWYgKCF0aGlzLmFkYXB0ZXIuaXNEYXRlSW5zdGFuY2Uoc3RhcnREYXRlKSAmJiAhdGhpcy5hZGFwdGVyLmlzRGF0ZUluc3RhbmNlKGVuZERhdGUpKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IodGhpcy5pbnZhbGlkRGF0ZUVycm9yVGV4dCk7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCB2YXJpYWJsZXMgPSB7IC4uLnRoaXMuYWRhcHRlci5jb25maWcudmFyaWFibGVzLCAuLi50ZW1wbGF0ZS52YXJpYWJsZXMgfTtcbiAgICAgICAgbGV0IHBhcmFtcyA9IHt9O1xuXG4gICAgICAgIGlmIChzdGFydERhdGUpIHtcbiAgICAgICAgICAgIGNvbnN0IHN0YXJ0RGF0ZVZhcmlhYmxlcyA9IHRoaXMuY29tcGlsZVZhcmlhYmxlcyhzdGFydERhdGUsIHZhcmlhYmxlcyk7XG5cbiAgICAgICAgICAgIHBhcmFtcyA9IHtcbiAgICAgICAgICAgICAgICAuLi52YXJpYWJsZXMsXG4gICAgICAgICAgICAgICAgU1RBUlRfREFURTogdGhpcy5tZXNzYWdlRm9ybWF0LmNvbXBpbGUodGVtcGxhdGUuU1RBUlRfREFURSkoc3RhcnREYXRlVmFyaWFibGVzKSxcbiAgICAgICAgICAgICAgICBSQU5HRV9UWVBFOiAnb25seVN0YXJ0J1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfSBlbHNlIGlmIChlbmREYXRlKSB7XG4gICAgICAgICAgICBjb25zdCBlbmREYXRlVmFyaWFibGVzID0gdGhpcy5jb21waWxlVmFyaWFibGVzKGVuZERhdGUsIHZhcmlhYmxlcyk7XG5cbiAgICAgICAgICAgIHBhcmFtcyA9IHtcbiAgICAgICAgICAgICAgICAuLi52YXJpYWJsZXMsXG4gICAgICAgICAgICAgICAgRU5EX0RBVEU6IHRoaXMubWVzc2FnZUZvcm1hdC5jb21waWxlKHRlbXBsYXRlLkVORF9EQVRFKShlbmREYXRlVmFyaWFibGVzKSxcbiAgICAgICAgICAgICAgICBSQU5HRV9UWVBFOiAnb25seUVuZCdcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcy5tZXNzYWdlRm9ybWF0LmNvbXBpbGUodGVtcGxhdGUuREFURSkocGFyYW1zKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gc3RhcnREYXRlIC0gc3RhcnQgZGF0ZVxuICAgICAqIEBwYXJhbSBlbmREYXRlIC0gZW5kIGRhdGVcbiAgICAgKiBAcGFyYW0gdGVtcGxhdGUgLSB0ZW1wbGF0ZVxuICAgICAqIEByZXR1cm5zIG9wZW5lZCBkYXRlXG4gICAgICovXG4gICAgb3BlbmVkUmFuZ2VEYXRlVGltZShzdGFydERhdGU6IEQgfCBudWxsLCBlbmREYXRlOiBEIHwgbnVsbCwgdGVtcGxhdGU6IEZvcm1hdHRlclJhbmdlVGVtcGxhdGUpIHtcbiAgICAgICAgaWYgKCF0aGlzLmFkYXB0ZXIuaXNEYXRlSW5zdGFuY2Uoc3RhcnREYXRlKSAmJiAhdGhpcy5hZGFwdGVyLmlzRGF0ZUluc3RhbmNlKGVuZERhdGUpKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IodGhpcy5pbnZhbGlkRGF0ZUVycm9yVGV4dCk7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCB2YXJpYWJsZXMgPSB7IC4uLnRoaXMuYWRhcHRlci5jb25maWcudmFyaWFibGVzLCAuLi50ZW1wbGF0ZS52YXJpYWJsZXMgfTtcbiAgICAgICAgbGV0IHBhcmFtcyA9IHt9O1xuXG4gICAgICAgIGlmIChzdGFydERhdGUpIHtcbiAgICAgICAgICAgIGNvbnN0IHN0YXJ0RGF0ZVZhcmlhYmxlcyA9IHRoaXMuY29tcGlsZVZhcmlhYmxlcyhzdGFydERhdGUsIHZhcmlhYmxlcyk7XG5cbiAgICAgICAgICAgIHBhcmFtcyA9IHtcbiAgICAgICAgICAgICAgICAuLi52YXJpYWJsZXMsXG4gICAgICAgICAgICAgICAgU1RBUlRfREFURVRJTUU6IHRoaXMubWVzc2FnZUZvcm1hdC5jb21waWxlKHRlbXBsYXRlLlNUQVJUX0RBVEVUSU1FKShzdGFydERhdGVWYXJpYWJsZXMpLFxuICAgICAgICAgICAgICAgIFJBTkdFX1RZUEU6ICdvbmx5U3RhcnQnXG4gICAgICAgICAgICB9O1xuICAgICAgICB9IGVsc2UgaWYgKGVuZERhdGUpIHtcbiAgICAgICAgICAgIGNvbnN0IGVuZERhdGVWYXJpYWJsZXMgPSB0aGlzLmNvbXBpbGVWYXJpYWJsZXMoZW5kRGF0ZSwgdmFyaWFibGVzKTtcblxuICAgICAgICAgICAgcGFyYW1zID0ge1xuICAgICAgICAgICAgICAgIC4uLnZhcmlhYmxlcyxcbiAgICAgICAgICAgICAgICBFTkRfREFURVRJTUU6IHRoaXMubWVzc2FnZUZvcm1hdC5jb21waWxlKHRlbXBsYXRlLkVORF9EQVRFVElNRSkoZW5kRGF0ZVZhcmlhYmxlcyksXG4gICAgICAgICAgICAgICAgUkFOR0VfVFlQRTogJ29ubHlFbmQnXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXMubWVzc2FnZUZvcm1hdC5jb21waWxlKHRlbXBsYXRlLkRBVEVUSU1FKShwYXJhbXMpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSBzdGFydERhdGUgLSBzdGFydCBkYXRlXG4gICAgICogQHBhcmFtIGVuZERhdGUgLSBlbmQgZGF0ZVxuICAgICAqIEBwYXJhbSB0ZW1wbGF0ZSAtIHRlbXBsYXRlXG4gICAgICogQHJldHVybnMgcmFuZ2UgZGF0ZSBpbiB0ZW1wbGF0ZSBmb3JtYXRcbiAgICAgKi9cbiAgICByYW5nZURhdGUoc3RhcnREYXRlOiBELCBlbmREYXRlOiBELCB0ZW1wbGF0ZTogRm9ybWF0dGVyUmFuZ2VUZW1wbGF0ZSk6IHN0cmluZyB7XG4gICAgICAgIGlmICghdGhpcy5hZGFwdGVyLmlzRGF0ZUluc3RhbmNlKHN0YXJ0RGF0ZSkgfHwgIXRoaXMuYWRhcHRlci5pc0RhdGVJbnN0YW5jZShlbmREYXRlKSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKHRoaXMuaW52YWxpZERhdGVFcnJvclRleHQpO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgdmFyaWFibGVzID0geyAuLi50aGlzLmFkYXB0ZXIuY29uZmlnLnZhcmlhYmxlcywgLi4udGVtcGxhdGUudmFyaWFibGVzIH07XG4gICAgICAgIGNvbnN0IHNhbWVNb250aCA9IHRoaXMuaGFzU2FtZShzdGFydERhdGUsIGVuZERhdGUsICdtb250aCcpO1xuXG4gICAgICAgIGNvbnN0IHN0YXJ0RGF0ZVZhcmlhYmxlcyA9IHRoaXMuY29tcGlsZVZhcmlhYmxlcyhzdGFydERhdGUsIHZhcmlhYmxlcyk7XG4gICAgICAgIHN0YXJ0RGF0ZVZhcmlhYmxlcy5TQU1FX01PTlRIID0gc2FtZU1vbnRoO1xuXG4gICAgICAgIGNvbnN0IGVuZERhdGVWYXJpYWJsZXMgPSB0aGlzLmNvbXBpbGVWYXJpYWJsZXMoZW5kRGF0ZSwgdmFyaWFibGVzKTtcbiAgICAgICAgZW5kRGF0ZVZhcmlhYmxlcy5TQU1FX01PTlRIID0gc2FtZU1vbnRoO1xuXG4gICAgICAgIGNvbnN0IGJvdGhDdXJyZW50WWVhciA9IHN0YXJ0RGF0ZVZhcmlhYmxlcy5DVVJSRU5UX1lFQVIgPT09ICd5ZXMnICYmIGVuZERhdGVWYXJpYWJsZXMuQ1VSUkVOVF9ZRUFSID09PSAneWVzJztcbiAgICAgICAgc3RhcnREYXRlVmFyaWFibGVzLkNVUlJFTlRfWUVBUiA9IGJvdGhDdXJyZW50WWVhciA/ICd5ZXMnIDogJ25vJztcbiAgICAgICAgZW5kRGF0ZVZhcmlhYmxlcy5DVVJSRU5UX1lFQVIgPSBib3RoQ3VycmVudFllYXIgPyAneWVzJyA6ICdubyc7XG5cbiAgICAgICAgY29uc3QgcGFyYW1zID0ge1xuICAgICAgICAgICAgLi4udmFyaWFibGVzLFxuICAgICAgICAgICAgU1RBUlRfREFURTogdGhpcy5tZXNzYWdlRm9ybWF0LmNvbXBpbGUodGVtcGxhdGUuU1RBUlRfREFURSkoc3RhcnREYXRlVmFyaWFibGVzKSxcbiAgICAgICAgICAgIEVORF9EQVRFOiB0aGlzLm1lc3NhZ2VGb3JtYXQuY29tcGlsZSh0ZW1wbGF0ZS5FTkRfREFURSkoZW5kRGF0ZVZhcmlhYmxlcyksXG4gICAgICAgICAgICBTQU1FX01PTlRIOiBzYW1lTW9udGhcbiAgICAgICAgfTtcblxuICAgICAgICByZXR1cm4gdGhpcy5tZXNzYWdlRm9ybWF0LmNvbXBpbGUodGVtcGxhdGUuREFURSkocGFyYW1zKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gc3RhcnREYXRlIC0gc3RhcnQgZGF0ZVxuICAgICAqIEBwYXJhbSBlbmREYXRlIC0gZW5kIGRhdGVcbiAgICAgKiBAcGFyYW0gdGVtcGxhdGUgLSB0ZW1wbGF0ZVxuICAgICAqIEByZXR1cm5zIHJhbmdlIGRhdGUgaW4gdGVtcGxhdGUgZm9ybWF0IHdpdGggdGltZVxuICAgICAqL1xuICAgIHJhbmdlRGF0ZVRpbWUoc3RhcnREYXRlOiBELCBlbmREYXRlOiBELCB0ZW1wbGF0ZTogRm9ybWF0dGVyUmFuZ2VUZW1wbGF0ZSk6IHN0cmluZyB7XG4gICAgICAgIGlmICghdGhpcy5hZGFwdGVyLmlzRGF0ZUluc3RhbmNlKHN0YXJ0RGF0ZSkgfHwgIXRoaXMuYWRhcHRlci5pc0RhdGVJbnN0YW5jZShlbmREYXRlKSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKHRoaXMuaW52YWxpZERhdGVFcnJvclRleHQpO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgdmFyaWFibGVzID0gey4uLnRoaXMuYWRhcHRlci5jb25maWcudmFyaWFibGVzLCAuLi50ZW1wbGF0ZS52YXJpYWJsZXN9O1xuICAgICAgICBjb25zdCBzYW1lTW9udGggPSB0aGlzLmhhc1NhbWUoc3RhcnREYXRlLCBlbmREYXRlLCAnbW9udGgnKTtcbiAgICAgICAgY29uc3Qgc2FtZURheSA9IHRoaXMuaGFzU2FtZShzdGFydERhdGUsIGVuZERhdGUsICdkYXknKTtcblxuICAgICAgICBjb25zdCBzdGFydERhdGVWYXJpYWJsZXMgPSB0aGlzLmNvbXBpbGVWYXJpYWJsZXMoc3RhcnREYXRlLCB2YXJpYWJsZXMpO1xuICAgICAgICBzdGFydERhdGVWYXJpYWJsZXMuU0FNRV9NT05USCA9IHNhbWVNb250aDtcbiAgICAgICAgc3RhcnREYXRlVmFyaWFibGVzLlNBTUVfREFZID0gc2FtZURheTtcblxuICAgICAgICBjb25zdCBlbmREYXRlVmFyaWFibGVzID0gdGhpcy5jb21waWxlVmFyaWFibGVzKGVuZERhdGUsIHZhcmlhYmxlcyk7XG4gICAgICAgIGVuZERhdGVWYXJpYWJsZXMuU0FNRV9NT05USCA9IHNhbWVNb250aDtcbiAgICAgICAgZW5kRGF0ZVZhcmlhYmxlcy5TQU1FX0RBWSA9IHNhbWVEYXk7XG5cbiAgICAgICAgY29uc3QgYm90aEN1cnJlbnRZZWFyID0gc3RhcnREYXRlVmFyaWFibGVzLkNVUlJFTlRfWUVBUiA9PT0gJ3llcycgJiYgZW5kRGF0ZVZhcmlhYmxlcy5DVVJSRU5UX1lFQVIgPT09ICd5ZXMnO1xuICAgICAgICBzdGFydERhdGVWYXJpYWJsZXMuQ1VSUkVOVF9ZRUFSID0gYm90aEN1cnJlbnRZZWFyID8gJ3llcycgOiAnbm8nO1xuICAgICAgICBlbmREYXRlVmFyaWFibGVzLkNVUlJFTlRfWUVBUiA9IGJvdGhDdXJyZW50WWVhciA/ICd5ZXMnIDogJ25vJztcblxuICAgICAgICBjb25zdCBwYXJhbXMgPSB7XG4gICAgICAgICAgICAuLi52YXJpYWJsZXMsXG4gICAgICAgICAgICBTVEFSVF9EQVRFVElNRTogdGhpcy5tZXNzYWdlRm9ybWF0LmNvbXBpbGUodGVtcGxhdGUuU1RBUlRfREFURVRJTUUpKHN0YXJ0RGF0ZVZhcmlhYmxlcyksXG4gICAgICAgICAgICBFTkRfREFURVRJTUU6IHRoaXMubWVzc2FnZUZvcm1hdC5jb21waWxlKHRlbXBsYXRlLkVORF9EQVRFVElNRSkoZW5kRGF0ZVZhcmlhYmxlcyksXG4gICAgICAgICAgICBTQU1FX01PTlRIOiBzYW1lTW9udGgsXG4gICAgICAgICAgICBTQU1FX0RBWTogc2FtZURheVxuICAgICAgICB9O1xuXG4gICAgICAgIHJldHVybiB0aGlzLm1lc3NhZ2VGb3JtYXQuY29tcGlsZSh0ZW1wbGF0ZS5EQVRFVElNRSkocGFyYW1zKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gc3RhcnREYXRlIC0gc3RhcnQgZGF0ZVxuICAgICAqIEBwYXJhbSBlbmREYXRlIC0gZW5kIGRhdGVcbiAgICAgKiBAcmV0dXJucyByYW5nZSBkYXRlIGluIHNob3J0IGZvcm1hdFxuICAgICAqL1xuICAgIHJhbmdlU2hvcnREYXRlKHN0YXJ0RGF0ZTogRCB8IG51bGwsIGVuZERhdGU/OiBEKTogc3RyaW5nIHtcbiAgICAgICAgY29uc3QgcmFuZ2VUZW1wbGF0ZXMgPSB0aGlzLmNvbmZpZy5yYW5nZVRlbXBsYXRlcztcblxuICAgICAgICBpZiAoc3RhcnREYXRlICYmIGVuZERhdGUpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnJhbmdlRGF0ZShzdGFydERhdGUsIGVuZERhdGUsIHJhbmdlVGVtcGxhdGVzLmNsb3NlZFJhbmdlLnNob3J0KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzLm9wZW5lZFJhbmdlRGF0ZShzdGFydERhdGUsIGVuZERhdGUgfHwgbnVsbCwgcmFuZ2VUZW1wbGF0ZXMub3BlbmVkUmFuZ2Uuc2hvcnQpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSBzdGFydERhdGUgLSBzdGFydCBkYXRlXG4gICAgICogQHBhcmFtIGVuZERhdGUgLSBlbmQgZGF0ZVxuICAgICAqIEByZXR1cm5zIHJhbmdlIGRhdGUgaW4gc2hvcnQgZm9ybWF0IHdpdGggdGltZVxuICAgICAqL1xuICAgIHJhbmdlU2hvcnREYXRlVGltZShzdGFydERhdGU6IEQgfCBudWxsLCBlbmREYXRlPzogRCk6IHN0cmluZyB7XG4gICAgICAgIGNvbnN0IHJhbmdlVGVtcGxhdGVzID0gdGhpcy5jb25maWcucmFuZ2VUZW1wbGF0ZXM7XG5cbiAgICAgICAgaWYgKHN0YXJ0RGF0ZSAmJiBlbmREYXRlKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5yYW5nZURhdGVUaW1lKHN0YXJ0RGF0ZSwgZW5kRGF0ZSwgcmFuZ2VUZW1wbGF0ZXMuY2xvc2VkUmFuZ2Uuc2hvcnQpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXMub3BlbmVkUmFuZ2VEYXRlVGltZShzdGFydERhdGUsIGVuZERhdGUgfHwgbnVsbCwgcmFuZ2VUZW1wbGF0ZXMub3BlbmVkUmFuZ2Uuc2hvcnQpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSBzdGFydERhdGUgLSBzdGFydCBkYXRlXG4gICAgICogQHBhcmFtIGVuZERhdGUgLSBlbmQgZGF0ZVxuICAgICAqIEByZXR1cm5zIHJhbmdlIGRhdGUgaW4gbG9uZyBmb3JtYXRcbiAgICAgKi9cbiAgICByYW5nZUxvbmdEYXRlKHN0YXJ0RGF0ZTogRCB8IG51bGwsIGVuZERhdGU/OiBEKTogc3RyaW5nIHtcbiAgICAgICAgY29uc3QgcmFuZ2VUZW1wbGF0ZXMgPSB0aGlzLmNvbmZpZy5yYW5nZVRlbXBsYXRlcztcblxuICAgICAgICBpZiAoc3RhcnREYXRlICYmIGVuZERhdGUpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnJhbmdlRGF0ZShzdGFydERhdGUsIGVuZERhdGUsIHJhbmdlVGVtcGxhdGVzLmNsb3NlZFJhbmdlLmxvbmcpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXMub3BlbmVkUmFuZ2VEYXRlKHN0YXJ0RGF0ZSwgZW5kRGF0ZSB8fCBudWxsLCByYW5nZVRlbXBsYXRlcy5vcGVuZWRSYW5nZS5sb25nKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gc3RhcnREYXRlIC0gc3RhcnQgZGF0ZVxuICAgICAqIEBwYXJhbSBlbmREYXRlIC0gZW5kIGRhdGVcbiAgICAgKiBAcmV0dXJucyByYW5nZSBkYXRlIGluIGxvbmcgZm9ybWF0IHdpdGggdGltZVxuICAgICAqL1xuICAgIHJhbmdlTG9uZ0RhdGVUaW1lKHN0YXJ0RGF0ZTogRCB8IG51bGwsIGVuZERhdGU/OiBEKTogc3RyaW5nIHtcbiAgICAgICAgY29uc3QgcmFuZ2VUZW1wbGF0ZXMgPSB0aGlzLmNvbmZpZy5yYW5nZVRlbXBsYXRlcztcblxuICAgICAgICBpZiAoc3RhcnREYXRlICYmIGVuZERhdGUpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnJhbmdlRGF0ZVRpbWUoc3RhcnREYXRlLCBlbmREYXRlLCByYW5nZVRlbXBsYXRlcy5jbG9zZWRSYW5nZS5sb25nKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzLm9wZW5lZFJhbmdlRGF0ZVRpbWUoc3RhcnREYXRlLCBlbmREYXRlIHx8IG51bGwsIHJhbmdlVGVtcGxhdGVzLm9wZW5lZFJhbmdlLmxvbmcpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSBzdGFydERhdGUgLSBzdGFydCBkYXRlXG4gICAgICogQHBhcmFtIGVuZERhdGUgLSBlbmQgZGF0ZVxuICAgICAqIEByZXR1cm5zIHJhbmdlIG1pZGRsZSBkYXRlIHdpdGggdGltZVxuICAgICAqL1xuICAgIHJhbmdlTWlkZGxlRGF0ZVRpbWUoc3RhcnREYXRlOiBELCBlbmREYXRlOiBEKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmFuZ2VEYXRlVGltZShzdGFydERhdGUsIGVuZERhdGUsIHRoaXMuY29uZmlnLnJhbmdlVGVtcGxhdGVzLmNsb3NlZFJhbmdlLm1pZGRsZSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBjb21waWxlVmFyaWFibGVzKGRhdGU6IEQsIHZhcmlhYmxlczogYW55KTogYW55IHtcbiAgICAgICAgY29uc3QgY29tcGlsZWRWYXJpYWJsZXM6IGFueSA9IHt9O1xuXG4gICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1mb3ItaW5cbiAgICAgICAgZm9yIChjb25zdCBrZXkgaW4gdmFyaWFibGVzKSB7XG4gICAgICAgICAgICBpZiAoIXZhcmlhYmxlcy5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7IGNvbnRpbnVlOyB9XG5cbiAgICAgICAgICAgIGNvbnN0IHZhbHVlID0gdmFyaWFibGVzW2tleV07XG4gICAgICAgICAgICBjb21waWxlZFZhcmlhYmxlc1trZXldID0gdGhpcy5hZGFwdGVyLmZvcm1hdChkYXRlLCB2YWx1ZSk7XG4gICAgICAgIH1cblxuICAgICAgICBjb21waWxlZFZhcmlhYmxlcy5DVVJSRU5UX1lFQVIgPSB0aGlzLmhhc1NhbWUoZGF0ZSwgdGhpcy5hZGFwdGVyLnRvZGF5KCksICd5ZWFyJyk7XG5cbiAgICAgICAgcmV0dXJuIGNvbXBpbGVkVmFyaWFibGVzO1xuICAgIH1cblxuICAgIHByaXZhdGUgaGFzU2FtZShzdGFydERhdGU6IEQsIGVuZERhdGU6IEQsIHVuaXQ6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLmFkYXB0ZXIuaGFzU2FtZShzdGFydERhdGUsIGVuZERhdGUsIHVuaXQpID8gJ3llcycgOiAnbm8nO1xuICAgIH1cbn1cbiJdfQ==