/**
 * @license
 * Positive Technologies All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license.
 */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@ptsecurity/cdk/datetime'), require('moment')) :
	typeof define === 'function' && define.amd ? define('@ptsecurity/mosaic-moment-adapter', ['exports', '@angular/core', '@ptsecurity/cdk/datetime', 'moment'], factory) :
	(factory((global.ng = global.ng || {}, global.ng['mosaic-moment-adapter'] = {}),global.ng.core,global.ng.cdk.datetime,global.moment.moment));
}(this, (function (exports,core,datetime,_rollupMoment__default) { 'use strict';

var _rollupMoment__default__default = _rollupMoment__default['default'];

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

function __param(paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
}

function __metadata(metadataKey, metadataValue) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
}

var enUS = {
    variables: {
        SECONDS: 's',
        MINUTES: 'm',
        TIME: 'HH:mm',
        DAY: 'D',
        MONTH: 'MMM',
        YEAR: 'YYYY',
        DATE: 'MMMM\u00A0D',
        SHORT_DATE: 'MMM\u00A0D',
        DASH: '\u2013',
        LONG_DASH: '\u202F\u2013\u2009',
        NBSP: '\u00A0'
    },
    monthNames: {
        long: [
            'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September',
            'October', 'November', 'December'
        ],
        short: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        narrow: ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D']
    },
    dayOfWeekNames: {
        long: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        short: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        narrow: ['S', 'M', 'T', 'W', 'T', 'F', 'S']
    },
    relativeTemplates: {
        short: {
            SECONDS_AGO: '{SECONDS_PASSED}{NBSP}s ago',
            MINUTES_AGO: '{MINUTES_PASSED}{NBSP}min ago',
            TODAY: '{TIME}',
            YESTERDAY: 'Yesterday, {TIME}',
            BEFORE_YESTERDAY: '{CURRENT_YEAR, select, yes{{SHORT_DATE}, {TIME}} other{{SHORT_DATE}, {YEAR}}}'
        },
        long: {
            SECONDS_AGO: '{SECONDS_PASSED, plural, =1{#{NBSP}second} other{#{NBSP}seconds}} ago',
            MINUTES_AGO: '{MINUTES_PASSED, plural, =1{#{NBSP}minute} other{#{NBSP}minutes}} ago',
            TODAY: '{TIME}',
            YESTERDAY: 'Yesterday, {TIME}',
            BEFORE_YESTERDAY: '{CURRENT_YEAR, select, yes{{DATE}, {TIME}} other{{DATE}, {YEAR}}}'
        }
    },
    absoluteTemplates: {
        short: {
            DATE: '{CURRENT_YEAR, select, yes{{SHORT_DATE}} other{{SHORT_DATE}, {YEAR}}}',
            DATETIME: '{CURRENT_YEAR, select, yes{{SHORT_DATE}, {TIME}} other{{SHORT_DATE}, {YEAR}, {TIME}}}'
        },
        long: {
            DATE: '{CURRENT_YEAR, select, yes{{DATE}} other{{DATE}, {YEAR}}}',
            DATETIME: '{CURRENT_YEAR, select, yes{{DATE}, {TIME}} other{{DATE}, {YEAR}, {TIME}}}'
        }
    },
    rangeTemplates: {
        short: {
            START_DATE: '{CURRENT_YEAR, select, yes{{SHORT_DATE}} other{{SHORT_DATE}, {YEAR}}}',
            END_DATE: "{\n                            SAME_MONTH,\n                            select,\n                                yes{{DAY}}\n                                other{{\n                                    CURRENT_YEAR,\n                                    select,\n                                        yes{{SHORT_DATE}}\n                                        other{{SHORT_DATE}, {YEAR}}\n                                }}\n                        }",
            DATE: "{\n                            SAME_MONTH,\n                            select,\n                                yes{{START_DATE}{DASH}{END_DATE}}\n                                other{{START_DATE}{LONG_DASH}{END_DATE}}\n                        }",
            START_DATETIME: "{\n                            SAME_DAY,\n                            select,\n                                yes{{TIME}}\n                                other{{\n                                    CURRENT_YEAR,\n                                    select,\n                                        yes{{SHORT_DATE}, {TIME}}\n                                        other{{SHORT_DATE}, {YEAR}, {TIME}}\n                                }}\n                        }",
            END_DATETIME: "{\n                            SAME_DAY,\n                            select,\n                                yes{{\n                                    CURRENT_YEAR,\n                                    select,\n                                        yes{{TIME}, {SHORT_DATE}}\n                                        other{{TIME}, {SHORT_DATE}, {YEAR}}\n                                }}\n                                other{{\n                                    CURRENT_YEAR,\n                                    select,\n                                        yes{{SHORT_DATE}, {TIME}}\n                                        other{{SHORT_DATE}, {YEAR}, {TIME}}\n                                }}\n                        }",
            DATETIME: "{\n                            SAME_DAY,\n                            select,\n                                yes{{START_DATETIME}{DASH}{END_DATETIME}}\n                                other{{START_DATETIME}{LONG_DASH}{END_DATETIME}}\n                        }"
        },
        middle: {
            START_DATE: "{\n                            SAME_MONTH,\n                            select,\n                                yes{{DAY}}\n                                other{{\n                                    CURRENT_YEAR,\n                                    select,\n                                        yes{{DATE}}\n                                        other{{DATE}, {YEAR}}\n                                }}\n                        }",
            END_DATE: '{CURRENT_YEAR, select, yes{{DATE}} other{{DATE}, {YEAR}}}',
            DATE: "{\n                            SAME_MONTH,\n                            select,\n                                yes{{START_DATE}{DASH}{END_DATE}}\n                                other{{START_DATE}{LONG_DASH}{END_DATE}}\n                        }",
            START_DATETIME: "{\n                            SAME_DAY,\n                            select,\n                                yes{{TIME}}\n                                other{{\n                                    CURRENT_YEAR,\n                                    select,\n                                        yes{{DATE}, {TIME}}\n                                        other{{DATE}, {YEAR}, {TIME}}\n                                }}\n                        }",
            END_DATETIME: "{\n                            SAME_DAY,\n                            select,\n                                yes{{\n                                    CURRENT_YEAR,\n                                    select,\n                                        yes{{TIME}, {DATE}}\n                                        other{{TIME}, {DATE}, {YEAR}}\n                                }}\n                                other{{\n                                    CURRENT_YEAR,\n                                    select,\n                                        yes{{DATE}, {TIME}}\n                                        other{{DATE}, {YEAR}, {TIME}}\n                                }}\n                        }",
            DATETIME: "{\n                            SAME_DAY,\n                            select,\n                                yes{{START_DATETIME}{DASH}{END_DATETIME}}\n                                other{{START_DATETIME}{LONG_DASH}{END_DATETIME}}\n                        }"
        },
        long: {
            START_DATE: '{CURRENT_YEAR, select, yes{{DATE}} other{{DATE}, {YEAR}}}',
            END_DATE: "{\n                            SAME_MONTH,\n                            select,\n                                yes{{DAY}}\n                                other{{\n                                    CURRENT_YEAR,\n                                    select,\n                                        yes{{DATE}}\n                                        other{{DATE}, {YEAR}}\n                                }}\n                        }",
            DATE: "{\n                            SAME_MONTH,\n                            select,\n                                yes{{START_DATE}{DASH}{END_DATE}}\n                                other{{START_DATE}{LONG_DASH}{END_DATE}}\n                        }",
            START_DATETIME: "{\n                            SAME_DAY,\n                            select,\n                                yes{{\n                                    CURRENT_YEAR,\n                                    select,\n                                        yes{{DATE}, from{NBSP}{TIME}}\n                                        other{{DATE}, {YEAR}, from{NBSP}{TIME}}\n                                }}\n                                other{{\n                                    CURRENT_YEAR,\n                                    select,\n                                        yes{{DATE}, {TIME}}\n                                        other{{DATE}, {YEAR}, {TIME}}\n                                }}\n                        }",
            END_DATETIME: "{\n                            SAME_DAY,\n                            select,\n                                yes{to{NBSP}{TIME}}\n                                other{{\n                                    CURRENT_YEAR,\n                                    select,\n                                        yes{{DATE}, {TIME}}\n                                        other{{DATE}, {YEAR}, {TIME}}\n                                }}\n                        }",
            DATETIME: "{\n                            SAME_DAY,\n                            select,\n                                yes{{START_DATETIME} {END_DATETIME}}\n                                other{From {START_DATETIME} to{NBSP}{END_DATETIME}}\n                        }"
        }
    }
};

var ruRU = {
    variables: {
        SECONDS: 's',
        MINUTES: 'm',
        TIME: 'HH:mm',
        DAY: 'D',
        MONTH: 'MMM',
        YEAR: 'YYYY',
        DATE: 'D\u00A0MMMM',
        SHORT_DATE: 'D\u00A0MMM',
        DASH: '\u2013',
        LONG_DASH: '\u202F\u2014\u2009',
        NBSP: '\u00A0'
    },
    monthNames: {
        long: [
            'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь',
            'Октябрь', 'Ноябрь', 'Декабрь'
        ],
        short: ['янв', 'фев', 'март', 'апр', 'май', 'июнь', 'июль', 'авг', 'сен', 'окт', 'ноя', 'дек'],
        narrow: ['Я', 'Ф', 'М', 'А', 'М', 'И', 'И', 'А', 'С', 'О', 'Н', 'Д']
    },
    dayOfWeekNames: {
        long: ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
        short: ['вс', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб'],
        narrow: ['В', 'П', 'В', 'С', 'Ч', 'П', 'С']
    },
    relativeTemplates: {
        short: {
            SECONDS_AGO: '{SECONDS_PASSED}{NBSP}с назад',
            MINUTES_AGO: '{MINUTES_PASSED}{NBSP}мин назад',
            TODAY: '{TIME}',
            YESTERDAY: 'Вчера, {TIME}',
            BEFORE_YESTERDAY: '{CURRENT_YEAR, select, yes{{SHORT_DATE}, {TIME}} other{{SHORT_DATE}, {YEAR}}}'
        },
        long: {
            // tslint:disable-next-line:max-line-length
            SECONDS_AGO: '{SECONDS_PASSED, plural, =1{#{NBSP}секунду} =2{#{NBSP}секунды} other{#{NBSP}секунд}} назад',
            MINUTES_AGO: '{MINUTES_PASSED, plural, =1{#{NBSP}минуту} =2{#{NBSP}минуты} other{#{NBSP}минут}} назад',
            TODAY: '{TIME}',
            YESTERDAY: 'Вчера, {TIME}',
            BEFORE_YESTERDAY: '{CURRENT_YEAR, select, yes{{DATE}, {TIME}} other{{DATE}, {YEAR}}}'
        }
    },
    absoluteTemplates: {
        short: {
            DATE: '{CURRENT_YEAR, select, yes{{SHORT_DATE}} other{{SHORT_DATE} {YEAR}}}',
            DATETIME: '{CURRENT_YEAR, select, yes{{SHORT_DATE}, {TIME}} other{{SHORT_DATE} {YEAR}, {TIME}}}'
        },
        long: {
            DATE: '{CURRENT_YEAR, select, yes{{DATE}} other{{DATE} {YEAR}}}',
            DATETIME: '{CURRENT_YEAR, select, yes{{DATE}, {TIME}} other{{DATE} {YEAR}, {TIME}}}'
        }
    },
    rangeTemplates: {
        short: {
            START_DATE: "{\n                            SAME_MONTH,\n                            select,\n                                yes{{DAY}}\n                                other{{\n                                    CURRENT_YEAR,\n                                    select,\n                                        yes{{SHORT_DATE}}\n                                        other{{SHORT_DATE} {YEAR}}\n                                }}\n                        }",
            END_DATE: '{CURRENT_YEAR, select, yes{{SHORT_DATE}} other{{SHORT_DATE} {YEAR}}}',
            DATE: "{\n                            SAME_MONTH,\n                            select,\n                                yes{{START_DATE}{DASH}{END_DATE}}\n                                other{{START_DATE}{LONG_DASH}{END_DATE}}\n                        }",
            START_DATETIME: "{\n                            SAME_DAY,\n                            select,\n                                yes{{TIME}}\n                                other{{\n                                    CURRENT_YEAR,\n                                    select,\n                                        yes{{SHORT_DATE}, {TIME}}\n                                        other{{SHORT_DATE} {YEAR}, {TIME}}\n                                }}\n                        }",
            END_DATETIME: "{\n                            SAME_DAY,\n                            select,\n                                yes{{\n                                    CURRENT_YEAR,\n                                    select,\n                                        yes{{TIME}, {SHORT_DATE}}\n                                        other{{TIME}, {SHORT_DATE} {YEAR}}\n                                }}\n                                other{{\n                                    CURRENT_YEAR,\n                                    select,\n                                        yes{{SHORT_DATE}, {TIME}}\n                                        other{{SHORT_DATE} {YEAR}, {TIME}}\n                                }}\n                        }",
            DATETIME: "{\n                            SAME_DAY,\n                            select,\n                                yes{{START_DATETIME}{DASH}{END_DATETIME}}\n                                other{{START_DATETIME}{LONG_DASH}{END_DATETIME}}\n                        }"
        },
        middle: {
            START_DATE: "{\n                            SAME_MONTH,\n                            select,\n                                yes{{DAY}}\n                                other{{\n                                    CURRENT_YEAR,\n                                    select,\n                                        yes{{DATE}}\n                                        other{{DATE} {YEAR}}\n                                }}\n                        }",
            END_DATE: '{CURRENT_YEAR, select, yes{{DATE}} other{{DATE} {YEAR}}}',
            DATE: "{\n                            SAME_MONTH,\n                            select,\n                                yes{{START_DATE}{DASH}{END_DATE}}\n                                other{{START_DATE}{LONG_DASH}{END_DATE}}\n                        }",
            START_DATETIME: "{\n                            SAME_DAY,\n                            select,\n                                yes{{TIME}}\n                                other{{\n                                    CURRENT_YEAR,\n                                    select,\n                                        yes{{DATE}, {TIME}}\n                                        other{{DATE} {YEAR}, {TIME}}\n                                }}\n                        }",
            END_DATETIME: "{\n                            SAME_DAY,\n                            select,\n                                yes{{\n                                    CURRENT_YEAR,\n                                    select,\n                                        yes{{TIME}, {DATE}}\n                                        other{{TIME}, {DATE} {YEAR}}\n                                }}\n                                other{{\n                                    CURRENT_YEAR,\n                                    select,\n                                        yes{{DATE}, {TIME}}\n                                        other{{DATE} {YEAR}, {TIME}}\n                                }}\n                        }",
            DATETIME: "{\n                            SAME_DAY,\n                            select,\n                                yes{{START_DATETIME}{DASH}{END_DATETIME}}\n                                other{{START_DATETIME}{LONG_DASH}{END_DATETIME}}\n                        }"
        },
        long: {
            START_DATE: "{\n                            SAME_MONTH,\n                            select,\n                                yes{{DAY}}\n                                other{{\n                                    CURRENT_YEAR,\n                                    select,\n                                        yes{{DATE}}\n                                        other{{DATE} {YEAR}}\n                                }}\n                        }",
            END_DATE: '{CURRENT_YEAR, select, yes{{DATE}} other{{DATE} {YEAR}}}',
            DATE: "{\n                            SAME_MONTH,\n                            select,\n                                yes{{START_DATE}{DASH}{END_DATE}}\n                                other{{START_DATE}{LONG_DASH}{END_DATE}}\n                        }",
            START_DATETIME: "{\n                            SAME_DAY,\n                            select,\n                                yes{{\n                                    CURRENT_YEAR,\n                                    select,\n                                        yes{{DATE}, \u0441{NBSP}{TIME}}\n                                        other{{DATE} {YEAR}, \u0441{NBSP}{TIME}}\n                                }}\n                                other{{\n                                    CURRENT_YEAR,\n                                    select,\n                                        yes{{DATE}, {TIME}}\n                                        other{{DATE} {YEAR}, {TIME}}\n                                }}\n                        }",
            END_DATETIME: "{\n                            SAME_DAY,\n                            select,\n                                yes{\u043F\u043E{NBSP}{TIME}}\n                                other{{\n                                    CURRENT_YEAR,\n                                    select,\n                                        yes{{DATE}, {TIME}}\n                                        other{{DATE} {YEAR}, {TIME}}\n                                }}\n                        }",
            DATETIME: "{\n                            SAME_DAY,\n                            select,\n                                yes{{START_DATETIME} {END_DATETIME}}\n                                other{\u0421{NBSP}{START_DATETIME} \u043F\u043E{NBSP}{END_DATETIME}}\n                        }"
        }
    }
};

var moment = _rollupMoment__default__default || _rollupMoment__default;
/** InjectionToken for moment date adapter to configure options. */
var MC_MOMENT_DATE_ADAPTER_OPTIONS = new core.InjectionToken('MC_MOMENT_DATE_ADAPTER_OPTIONS', {
    providedIn: 'root',
    factory: MC_MOMENT_DATE_ADAPTER_OPTIONS_FACTORY
});
/** @docs-private */
// tslint:disable:naming-convention
function MC_MOMENT_DATE_ADAPTER_OPTIONS_FACTORY() {
    return {
        useUtc: false
    };
}
/** Creates an array and fills it with values. */
function range(length, valueFunction) {
    var valuesArray = Array(length);
    for (var i = 0; i < length; i++) {
        valuesArray[i] = valueFunction(i);
    }
    return valuesArray;
}
var MomentDateAdapter = /** @class */ (function (_super) {
    __extends(MomentDateAdapter, _super);
    function MomentDateAdapter(dateLocale, options) {
        var _this = _super.call(this) || this;
        _this.options = options;
        _this.setLocale(dateLocale || moment.locale());
        return _this;
    }
    MomentDateAdapter.prototype.setLocale = function (locale) {
        var _this = this;
        _super.prototype.setLocale.call(this, locale);
        var momentLocaleData = moment.localeData(locale);
        // This is our customs translations
        var i18nLocals = ['en', 'ru'];
        if (i18nLocals.indexOf(locale) !== -1) {
            var formatterConfig = locale === 'en' ? enUS : ruRU;
            momentLocaleData = moment.updateLocale(locale, {
                monthsShort: {
                    format: formatterConfig.monthNames.short,
                    standalone: formatterConfig.monthNames.short
                },
                weekdaysShort: formatterConfig.dayOfWeekNames.short,
                weekdays: formatterConfig.dayOfWeekNames.long
            });
        }
        this.localeData = {
            firstDayOfWeek: momentLocaleData.firstDayOfWeek(),
            longMonths: momentLocaleData.months(),
            shortMonths: momentLocaleData.monthsShort(),
            dates: range(31, function (i) { return _this.createDate(2017, 0, i + 1).format('D'); }),
            longDaysOfWeek: momentLocaleData.weekdays(),
            shortDaysOfWeek: momentLocaleData.weekdaysShort(),
            narrowDaysOfWeek: momentLocaleData.weekdaysMin()
        };
    };
    MomentDateAdapter.prototype.getYear = function (date) {
        return this.clone(date).year();
    };
    MomentDateAdapter.prototype.getMonth = function (date) {
        return this.clone(date).month();
    };
    MomentDateAdapter.prototype.getDate = function (date) {
        return this.clone(date).date();
    };
    MomentDateAdapter.prototype.getDayOfWeek = function (date) {
        return this.clone(date).day();
    };
    MomentDateAdapter.prototype.getMonthNames = function (style) {
        // Moment.js doesn't support narrow month names
        return style === 'long' ? this.localeData.longMonths : this.localeData.shortMonths;
    };
    MomentDateAdapter.prototype.getDateNames = function () {
        return this.localeData.dates;
    };
    MomentDateAdapter.prototype.getDayOfWeekNames = function (style) {
        if (style === 'long') {
            return this.localeData.longDaysOfWeek;
        }
        if (style === 'short') {
            return this.localeData.shortDaysOfWeek;
        }
        return this.localeData.narrowDaysOfWeek;
    };
    MomentDateAdapter.prototype.getYearName = function (date) {
        return this.clone(date).format('YYYY');
    };
    MomentDateAdapter.prototype.getFirstDayOfWeek = function () {
        return this.localeData.firstDayOfWeek;
    };
    MomentDateAdapter.prototype.getNumDaysInMonth = function (date) {
        return this.clone(date).daysInMonth();
    };
    MomentDateAdapter.prototype.clone = function (date) {
        return date.clone().locale(this.locale);
    };
    MomentDateAdapter.prototype.createDate = function (year, month, date) {
        // Moment.js will create an invalid date if any of the components are out of bounds, but we
        // explicitly check each case so we can throw more descriptive errors.
        if (month < 0 || month > 11) {
            throw Error("Invalid month index \"" + month + "\". Month index has to be between 0 and 11.");
        }
        if (date < 1) {
            throw Error("Invalid date \"" + date + "\". Date has to be greater than 0.");
        }
        var result = this.createMoment({ year: year, month: month, date: date }).locale(this.locale);
        // If the result isn't valid, the date must have been out of bounds for this month.
        if (!result.isValid()) {
            throw Error("Invalid date \"" + date + "\" for month with index \"" + month + "\".");
        }
        return result;
    };
    MomentDateAdapter.prototype.today = function () {
        return this.createMoment().locale(this.locale);
    };
    MomentDateAdapter.prototype.parse = function (value, parseFormat) {
        // tslint:disable:triple-equals
        if (value && typeof value == 'string') {
            return this.createMoment(value, parseFormat, this.locale);
        }
        return value ? this.createMoment(value).locale(this.locale) : null;
    };
    MomentDateAdapter.prototype.format = function (date, displayFormat) {
        // tslint:disable:no-parameter-reassignment
        date = this.clone(date);
        if (!this.isValid(date)) {
            throw Error('MomentDateAdapter: Cannot format invalid date.');
        }
        return date.format(displayFormat);
    };
    MomentDateAdapter.prototype.addCalendarYears = function (date, years) {
        return this.clone(date).add({ years: years });
    };
    MomentDateAdapter.prototype.addCalendarMonths = function (date, months) {
        return this.clone(date).add({ months: months });
    };
    MomentDateAdapter.prototype.addCalendarDays = function (date, days) {
        return this.clone(date).add({ days: days });
    };
    MomentDateAdapter.prototype.toIso8601 = function (date) {
        return this.clone(date).format();
    };
    /** https://www.ietf.org/rfc/rfc3339.txt */
    MomentDateAdapter.prototype.deserialize = function (value) {
        var date;
        if (value instanceof Date) {
            date = this.createMoment(value).locale(this.locale);
        }
        else if (this.isDateInstance(value)) {
            // Note: assumes that cloning also sets the correct locale.
            return this.clone(value);
        }
        if (typeof value === 'string') {
            if (!value) {
                return null;
            }
            date = this.createMoment(value, moment.ISO_8601).locale(this.locale);
        }
        if (date && this.isValid(date)) {
            return this.createMoment(date).locale(this.locale);
        }
        return _super.prototype.deserialize.call(this, value);
    };
    MomentDateAdapter.prototype.isDateInstance = function (obj) {
        return moment.isMoment(obj);
    };
    MomentDateAdapter.prototype.isValid = function (date) {
        return this.clone(date).isValid();
    };
    MomentDateAdapter.prototype.invalid = function () {
        return moment.invalid();
    };
    /** Creates a Moment instance while respecting the current UTC settings. */
    MomentDateAdapter.prototype.createMoment = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (this.options && this.options.useUtc) ? moment.utc.apply(moment, args) : moment.apply(void 0, args);
    };
    MomentDateAdapter = __decorate([
        core.Injectable(),
        __param(0, core.Optional()), __param(0, core.Inject(datetime.MC_DATE_LOCALE)),
        __param(1, core.Optional()), __param(1, core.Inject(MC_MOMENT_DATE_ADAPTER_OPTIONS)),
        __metadata("design:paramtypes", [String, Object])
    ], MomentDateAdapter);
    return MomentDateAdapter;
}(datetime.DateAdapter));

var MC_MOMENT_DATE_FORMATS = {
    parse: {
        dateInput: 'L'
    },
    display: {
        dateInput: 'L',
        monthYearLabel: 'MMM YYYY',
        dateA11yLabel: 'LL',
        monthYearA11yLabel: 'MMMM YYYY'
    }
};

var MomentDateModule = /** @class */ (function () {
    function MomentDateModule() {
    }
    MomentDateModule = __decorate([
        core.NgModule({
            providers: [
                {
                    provide: datetime.DateAdapter,
                    useClass: MomentDateAdapter,
                    deps: [datetime.MC_DATE_LOCALE, MC_MOMENT_DATE_ADAPTER_OPTIONS]
                }
            ]
        })
    ], MomentDateModule);
    return MomentDateModule;
}());
var ɵ0 = MC_MOMENT_DATE_FORMATS;
var McMomentDateModule = /** @class */ (function () {
    function McMomentDateModule() {
    }
    McMomentDateModule = __decorate([
        core.NgModule({
            imports: [MomentDateModule],
            providers: [{
                    provide: datetime.MC_DATE_FORMATS, useValue: ɵ0
                }]
        })
    ], McMomentDateModule);
    return McMomentDateModule;
}());

exports.MomentDateModule = MomentDateModule;
exports.McMomentDateModule = McMomentDateModule;
exports.ɵ0 = ɵ0;
exports.MC_MOMENT_DATE_ADAPTER_OPTIONS = MC_MOMENT_DATE_ADAPTER_OPTIONS;
exports.MC_MOMENT_DATE_ADAPTER_OPTIONS_FACTORY = MC_MOMENT_DATE_ADAPTER_OPTIONS_FACTORY;
exports.MomentDateAdapter = MomentDateAdapter;
exports.MC_MOMENT_DATE_FORMATS = MC_MOMENT_DATE_FORMATS;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=mosaic-moment-adapter.umd.js.map
