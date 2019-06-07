/**
 * @license
 * Positive Technologies All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license.
 */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@ptsecurity/cdk/datetime'), require('messageformat'), require('moment')) :
	typeof define === 'function' && define.amd ? define('@ptsecurity/mosaic-moment-adapter', ['exports', '@angular/core', '@ptsecurity/cdk/datetime', 'messageformat', 'moment'], factory) :
	(factory((global.ng = global.ng || {}, global.ng.mosaicMomentAdapter = {}),global.ng.core,global.ng.cdk.datetime,global.messageformat,global.moment));
}(this, (function (exports,core,datetime,MessageFormat,_rollupMoment__default) { 'use strict';

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

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
var moment = _rollupMoment__default__default || _rollupMoment__default;
/**
 * InjectionToken for moment date adapter to configure options.
 * @type {?}
 */
var MC_MOMENT_DATE_ADAPTER_OPTIONS = new core.InjectionToken('MC_MOMENT_DATE_ADAPTER_OPTIONS', {
    providedIn: 'root',
    factory: MC_MOMENT_DATE_ADAPTER_OPTIONS_FACTORY
});
/**
 * \@docs-private
 * @return {?}
 */
// tslint:disable:naming-convention
function MC_MOMENT_DATE_ADAPTER_OPTIONS_FACTORY() {
    return {
        useUtc: false
    };
}
/**
 * Creates an array and fills it with values.
 * @template T
 * @param {?} length
 * @param {?} valueFunction
 * @return {?}
 */
function range(length, valueFunction) {
    /** @type {?} */
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
        _this.invalidDateErrorText = 'Invalid date';
        _this.setLocale(dateLocale || moment.locale());
        _this.configureTranslator(_this.locale);
        return _this;
    }
    Object.defineProperty(MomentDateAdapter.prototype, "momentWithLocale", {
        get: /**
         * @private
         * @return {?}
         */
        function () {
            return moment().locale(this.locale);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} locale
     * @return {?}
     */
    MomentDateAdapter.prototype.setLocale = /**
     * @param {?} locale
     * @return {?}
     */
    function (locale) {
        var _this = this;
        _super.prototype.setLocale.call(this, locale);
        /** @type {?} */
        var momentLocaleData = moment.localeData(locale);
        // This is our customs translations
        /** @type {?} */
        var i18nLocals = ['en', 'ru'];
        if (i18nLocals.indexOf(locale) !== -1) {
            this.formatterConfig = locale === 'en' ? enUS : ruRU;
            momentLocaleData = moment.updateLocale(locale, {
                monthsShort: {
                    format: this.formatterConfig.monthNames.short,
                    standalone: this.formatterConfig.monthNames.short
                },
                weekdaysShort: this.formatterConfig.dayOfWeekNames.short,
                weekdays: this.formatterConfig.dayOfWeekNames.long
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
    /**
     * @param {?} date
     * @return {?}
     */
    MomentDateAdapter.prototype.getYear = /**
     * @param {?} date
     * @return {?}
     */
    function (date) {
        return this.clone(date).year();
    };
    /**
     * @param {?} date
     * @return {?}
     */
    MomentDateAdapter.prototype.getMonth = /**
     * @param {?} date
     * @return {?}
     */
    function (date) {
        return this.clone(date).month();
    };
    /**
     * @param {?} date
     * @return {?}
     */
    MomentDateAdapter.prototype.getDate = /**
     * @param {?} date
     * @return {?}
     */
    function (date) {
        return this.clone(date).date();
    };
    /**
     * @param {?} date
     * @return {?}
     */
    MomentDateAdapter.prototype.getDayOfWeek = /**
     * @param {?} date
     * @return {?}
     */
    function (date) {
        return this.clone(date).day();
    };
    /**
     * @param {?} style
     * @return {?}
     */
    MomentDateAdapter.prototype.getMonthNames = /**
     * @param {?} style
     * @return {?}
     */
    function (style) {
        // Moment.js doesn't support narrow month names
        return style === 'long' ? this.localeData.longMonths : this.localeData.shortMonths;
    };
    /**
     * @return {?}
     */
    MomentDateAdapter.prototype.getDateNames = /**
     * @return {?}
     */
    function () {
        return this.localeData.dates;
    };
    /**
     * @param {?} style
     * @return {?}
     */
    MomentDateAdapter.prototype.getDayOfWeekNames = /**
     * @param {?} style
     * @return {?}
     */
    function (style) {
        if (style === 'long') {
            return this.localeData.longDaysOfWeek;
        }
        if (style === 'short') {
            return this.localeData.shortDaysOfWeek;
        }
        return this.localeData.narrowDaysOfWeek;
    };
    /**
     * @param {?} date
     * @return {?}
     */
    MomentDateAdapter.prototype.getYearName = /**
     * @param {?} date
     * @return {?}
     */
    function (date) {
        return this.clone(date).format('YYYY');
    };
    /**
     * @return {?}
     */
    MomentDateAdapter.prototype.getFirstDayOfWeek = /**
     * @return {?}
     */
    function () {
        return this.localeData.firstDayOfWeek;
    };
    /**
     * @param {?} date
     * @return {?}
     */
    MomentDateAdapter.prototype.getNumDaysInMonth = /**
     * @param {?} date
     * @return {?}
     */
    function (date) {
        return this.clone(date).daysInMonth();
    };
    /**
     * @param {?} date
     * @return {?}
     */
    MomentDateAdapter.prototype.clone = /**
     * @param {?} date
     * @return {?}
     */
    function (date) {
        return date.clone().locale(this.locale);
    };
    /**
     * @param {?} year
     * @param {?} month
     * @param {?} date
     * @return {?}
     */
    MomentDateAdapter.prototype.createDate = /**
     * @param {?} year
     * @param {?} month
     * @param {?} date
     * @return {?}
     */
    function (year, month, date) {
        // Moment.js will create an invalid date if any of the components are out of bounds, but we
        // explicitly check each case so we can throw more descriptive errors.
        if (month < 0 || month > 11) {
            throw Error("Invalid month index \"" + month + "\". Month index has to be between 0 and 11.");
        }
        if (date < 1) {
            throw Error("Invalid date \"" + date + "\". Date has to be greater than 0.");
        }
        /** @type {?} */
        var result = this.createMoment({ year: year, month: month, date: date }).locale(this.locale);
        // If the result isn't valid, the date must have been out of bounds for this month.
        if (!result.isValid()) {
            throw Error("Invalid date \"" + date + "\" for month with index \"" + month + "\".");
        }
        return result;
    };
    /**
     * @return {?}
     */
    MomentDateAdapter.prototype.today = /**
     * @return {?}
     */
    function () {
        return this.createMoment().locale(this.locale);
    };
    /**
     * @param {?} value
     * @param {?} parseFormat
     * @return {?}
     */
    MomentDateAdapter.prototype.parse = /**
     * @param {?} value
     * @param {?} parseFormat
     * @return {?}
     */
    function (value, parseFormat) {
        // tslint:disable:triple-equals
        if (value && typeof value == 'string') {
            return this.createMoment(value, parseFormat, this.locale);
        }
        return value ? this.createMoment(value).locale(this.locale) : null;
    };
    /**
     * @param {?} date
     * @param {?} displayFormat
     * @return {?}
     */
    MomentDateAdapter.prototype.format = /**
     * @param {?} date
     * @param {?} displayFormat
     * @return {?}
     */
    function (date, displayFormat) {
        // tslint:disable:no-parameter-reassignment
        date = this.clone(date);
        if (!this.isValid(date)) {
            throw Error('MomentDateAdapter: Cannot format invalid date.');
        }
        return date.format(displayFormat);
    };
    /**
     * @param {?} date
     * @param {?} years
     * @return {?}
     */
    MomentDateAdapter.prototype.addCalendarYears = /**
     * @param {?} date
     * @param {?} years
     * @return {?}
     */
    function (date, years) {
        return this.clone(date).add({ years: years });
    };
    /**
     * @param {?} date
     * @param {?} months
     * @return {?}
     */
    MomentDateAdapter.prototype.addCalendarMonths = /**
     * @param {?} date
     * @param {?} months
     * @return {?}
     */
    function (date, months) {
        return this.clone(date).add({ months: months });
    };
    /**
     * @param {?} date
     * @param {?} days
     * @return {?}
     */
    MomentDateAdapter.prototype.addCalendarDays = /**
     * @param {?} date
     * @param {?} days
     * @return {?}
     */
    function (date, days) {
        return this.clone(date).add({ days: days });
    };
    /**
     * @param {?} date
     * @return {?}
     */
    MomentDateAdapter.prototype.toIso8601 = /**
     * @param {?} date
     * @return {?}
     */
    function (date) {
        return this.clone(date).format();
    };
    /** https://www.ietf.org/rfc/rfc3339.txt */
    /**
     * https://www.ietf.org/rfc/rfc3339.txt
     * @param {?} value
     * @return {?}
     */
    MomentDateAdapter.prototype.deserialize = /**
     * https://www.ietf.org/rfc/rfc3339.txt
     * @param {?} value
     * @return {?}
     */
    function (value) {
        /** @type {?} */
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
    /**
     * @param {?} obj
     * @return {?}
     */
    MomentDateAdapter.prototype.isDateInstance = /**
     * @param {?} obj
     * @return {?}
     */
    function (obj) {
        return moment.isMoment(obj);
    };
    /**
     * @param {?} date
     * @return {?}
     */
    MomentDateAdapter.prototype.isValid = /**
     * @param {?} date
     * @return {?}
     */
    function (date) {
        return this.clone(date).isValid();
    };
    /**
     * @return {?}
     */
    MomentDateAdapter.prototype.invalid = /**
     * @return {?}
     */
    function () {
        return moment.invalid();
    };
    /**
     * @param {?} date
     * @param {?} template
     * @return {?}
     */
    MomentDateAdapter.prototype.relativeDate = /**
     * @param {?} date
     * @param {?} template
     * @return {?}
     */
    function (date, template) {
        if (!this.isDateInstance(date)) {
            throw new Error(this.invalidDateErrorText);
        }
        /** @type {?} */
        var now = this.momentWithLocale;
        /** @type {?} */
        var totalSeconds = now.diff(date, 'seconds');
        /** @type {?} */
        var totalMinutes = now.diff(date, 'minutes');
        /** @type {?} */
        var isToday = now.isSame(date, 'day');
        /** @type {?} */
        var isYesterday = now.add(-1, 'days').isSame(date, 'day');
        /** @type {?} */
        var templateVariables = __assign({}, this.formatterConfig.variables, template.variables);
        /** @type {?} */
        var variables = this.compileVariables(date, templateVariables);
        /** @type {?} */
        var newTemplate;
        if (totalSeconds <= 59) { // seconds ago
            variables.SECONDS_PASSED = totalSeconds;
            newTemplate = template.SECONDS_AGO;
        }
        else if (totalMinutes <= 59) { // minutes ago
            variables.MINUTES_PASSED = totalMinutes;
            newTemplate = template.MINUTES_AGO;
        }
        else if (isToday) { // today
            newTemplate = template.TODAY;
        }
        else if (isYesterday) { // yesterday
            newTemplate = template.YESTERDAY;
        }
        else { // before yesterday
            newTemplate = template.BEFORE_YESTERDAY;
        }
        return this.messageformat.compile(newTemplate)(variables);
    };
    /**
     * @param {?} date
     * @return {?}
     */
    MomentDateAdapter.prototype.relativeShortDate = /**
     * @param {?} date
     * @return {?}
     */
    function (date) {
        return this.relativeDate(date, this.formatterConfig.relativeTemplates.short);
    };
    /**
     * @param {?} date
     * @return {?}
     */
    MomentDateAdapter.prototype.relativeLongDate = /**
     * @param {?} date
     * @return {?}
     */
    function (date) {
        return this.relativeDate(date, this.formatterConfig.relativeTemplates.long);
    };
    /**
     * @param {?} date
     * @param {?} params
     * @param {?=} datetime
     * @return {?}
     */
    MomentDateAdapter.prototype.absoluteDate = /**
     * @param {?} date
     * @param {?} params
     * @param {?=} datetime
     * @return {?}
     */
    function (date, params, datetime$$1) {
        if (datetime$$1 === void 0) { datetime$$1 = false; }
        if (!this.isDateInstance(date)) {
            throw new Error(this.invalidDateErrorText);
        }
        /** @type {?} */
        var variables = __assign({}, this.formatterConfig.variables, params.variables);
        /** @type {?} */
        var template = datetime$$1 ? params.DATETIME : params.DATE;
        return this.messageformat.compile(template)(this.compileVariables(date, variables));
    };
    /**
     * @param {?} date
     * @return {?}
     */
    MomentDateAdapter.prototype.absoluteShortDate = /**
     * @param {?} date
     * @return {?}
     */
    function (date) {
        return this.absoluteDate(date, this.formatterConfig.absoluteTemplates.short);
    };
    /**
     * @param {?} date
     * @return {?}
     */
    MomentDateAdapter.prototype.absoluteShortDateTime = /**
     * @param {?} date
     * @return {?}
     */
    function (date) {
        return this.absoluteDate(date, this.formatterConfig.absoluteTemplates.short, true);
    };
    /**
     * @param {?} date
     * @return {?}
     */
    MomentDateAdapter.prototype.absoluteLongDate = /**
     * @param {?} date
     * @return {?}
     */
    function (date) {
        return this.absoluteDate(date, this.formatterConfig.absoluteTemplates.long);
    };
    /**
     * @param {?} date
     * @return {?}
     */
    MomentDateAdapter.prototype.absoluteLongDateTime = /**
     * @param {?} date
     * @return {?}
     */
    function (date) {
        return this.absoluteDate(date, this.formatterConfig.absoluteTemplates.long, true);
    };
    /**
     * @param {?} startDate
     * @param {?} endDate
     * @param {?} template
     * @return {?}
     */
    MomentDateAdapter.prototype.rangeDate = /**
     * @param {?} startDate
     * @param {?} endDate
     * @param {?} template
     * @return {?}
     */
    function (startDate, endDate, template) {
        if (!this.isDateInstance(startDate) || !this.isDateInstance(endDate)) {
            throw new Error(this.invalidDateErrorText);
        }
        /** @type {?} */
        var variables = __assign({}, this.formatterConfig.variables, template.variables);
        /** @type {?} */
        var sameMonth = this.isSame('month', startDate, endDate);
        /** @type {?} */
        var startDateVariables = this.compileVariables(startDate, variables);
        startDateVariables.SAME_MONTH = sameMonth;
        /** @type {?} */
        var endDateVariables = this.compileVariables(endDate, variables);
        endDateVariables.SAME_MONTH = sameMonth;
        /** @type {?} */
        var bothCurrentYear = startDateVariables.CURRENT_YEAR === 'yes' &&
            endDateVariables.CURRENT_YEAR === 'yes';
        startDateVariables.CURRENT_YEAR = bothCurrentYear ? 'yes' : 'no';
        endDateVariables.CURRENT_YEAR = bothCurrentYear ? 'yes' : 'no';
        /** @type {?} */
        var params = __assign({}, variables, { START_DATE: this.messageformat.compile(template.START_DATE)(startDateVariables), END_DATE: this.messageformat.compile(template.END_DATE)(endDateVariables), SAME_MONTH: sameMonth });
        return this.messageformat.compile(template.DATE)(params);
    };
    /**
     * @param {?} startDate
     * @param {?} endDate
     * @param {?} template
     * @return {?}
     */
    MomentDateAdapter.prototype.rangeDateTime = /**
     * @param {?} startDate
     * @param {?} endDate
     * @param {?} template
     * @return {?}
     */
    function (startDate, endDate, template) {
        if (!this.isDateInstance(startDate) || !this.isDateInstance(endDate)) {
            throw new Error(this.invalidDateErrorText);
        }
        /** @type {?} */
        var variables = __assign({}, this.formatterConfig.variables, template.variables);
        /** @type {?} */
        var sameMonth = this.isSame('month', startDate, endDate);
        /** @type {?} */
        var sameDay = this.isSame('day', startDate, endDate);
        /** @type {?} */
        var startDateVariables = this.compileVariables(startDate, variables);
        startDateVariables.SAME_MONTH = sameMonth;
        startDateVariables.SAME_DAY = sameDay;
        /** @type {?} */
        var endDateVariables = this.compileVariables(endDate, variables);
        endDateVariables.SAME_MONTH = sameMonth;
        endDateVariables.SAME_DAY = sameDay;
        /** @type {?} */
        var bothCurrentYear = startDateVariables.CURRENT_YEAR === 'yes' &&
            endDateVariables.CURRENT_YEAR === 'yes';
        startDateVariables.CURRENT_YEAR = bothCurrentYear ? 'yes' : 'no';
        endDateVariables.CURRENT_YEAR = bothCurrentYear ? 'yes' : 'no';
        /** @type {?} */
        var params = __assign({}, variables, { START_DATETIME: this.messageformat.compile(template.START_DATETIME)(startDateVariables), END_DATETIME: this.messageformat.compile(template.END_DATETIME)(endDateVariables), SAME_MONTH: sameMonth, SAME_DAY: sameDay });
        return this.messageformat.compile(template.DATETIME)(params);
    };
    /**
     * @param {?} startDate
     * @param {?} endDate
     * @return {?}
     */
    MomentDateAdapter.prototype.rangeShortDate = /**
     * @param {?} startDate
     * @param {?} endDate
     * @return {?}
     */
    function (startDate, endDate) {
        return this.rangeDate(startDate, endDate, this.formatterConfig.rangeTemplates.short);
    };
    /**
     * @param {?} startDate
     * @param {?} endDate
     * @return {?}
     */
    MomentDateAdapter.prototype.rangeShortDateTime = /**
     * @param {?} startDate
     * @param {?} endDate
     * @return {?}
     */
    function (startDate, endDate) {
        return this.rangeDateTime(startDate, endDate, this.formatterConfig.rangeTemplates.short);
    };
    /**
     * @param {?} startDate
     * @param {?} endDate
     * @return {?}
     */
    MomentDateAdapter.prototype.rangeLongDate = /**
     * @param {?} startDate
     * @param {?} endDate
     * @return {?}
     */
    function (startDate, endDate) {
        return this.rangeDate(startDate, endDate, this.formatterConfig.rangeTemplates.long);
    };
    /**
     * @param {?} startDate
     * @param {?} endDate
     * @return {?}
     */
    MomentDateAdapter.prototype.rangeLongDateTime = /**
     * @param {?} startDate
     * @param {?} endDate
     * @return {?}
     */
    function (startDate, endDate) {
        return this.rangeDateTime(startDate, endDate, this.formatterConfig.rangeTemplates.long);
    };
    /**
     * @param {?} startDate
     * @param {?} endDate
     * @return {?}
     */
    MomentDateAdapter.prototype.rangeMiddleDateTime = /**
     * @param {?} startDate
     * @param {?} endDate
     * @return {?}
     */
    function (startDate, endDate) {
        return this.rangeDateTime(startDate, endDate, this.formatterConfig.rangeTemplates.middle);
    };
    /** Creates a Moment instance while respecting the current UTC settings. */
    /**
     * Creates a Moment instance while respecting the current UTC settings.
     * @private
     * @param {...?} args
     * @return {?}
     */
    MomentDateAdapter.prototype.createMoment = /**
     * Creates a Moment instance while respecting the current UTC settings.
     * @private
     * @param {...?} args
     * @return {?}
     */
    function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (this.options && this.options.useUtc) ? moment.utc.apply(moment, args) : moment.apply(void 0, args);
    };
    /**
     * @private
     * @param {?} date
     * @param {?} variables
     * @return {?}
     */
    MomentDateAdapter.prototype.compileVariables = /**
     * @private
     * @param {?} date
     * @param {?} variables
     * @return {?}
     */
    function (date, variables) {
        /** @type {?} */
        var compiledVariables = {};
        // tslint:disable-next-line:no-for-in
        for (var key in variables) {
            if (!variables.hasOwnProperty(key)) {
                continue;
            }
            /** @type {?} */
            var value = variables[key];
            compiledVariables[key] = date.format(value);
        }
        compiledVariables.CURRENT_YEAR = this.isCurrentYear(date);
        return compiledVariables;
    };
    /**
     * @private
     * @param {?} value
     * @return {?}
     */
    MomentDateAdapter.prototype.isCurrentYear = /**
     * @private
     * @param {?} value
     * @return {?}
     */
    function (value) {
        return this.momentWithLocale.isSame(value, 'year') ? 'yes' : 'no';
    };
    /**
     * @private
     * @param {?} unit
     * @param {?} startDate
     * @param {?} endDate
     * @return {?}
     */
    MomentDateAdapter.prototype.isSame = /**
     * @private
     * @param {?} unit
     * @param {?} startDate
     * @param {?} endDate
     * @return {?}
     */
    function (unit, startDate, endDate) {
        return startDate.isSame(endDate, unit) ? 'yes' : 'no';
    };
    /**
     * @private
     * @param {?} locale
     * @return {?}
     */
    MomentDateAdapter.prototype.configureTranslator = /**
     * @private
     * @param {?} locale
     * @return {?}
     */
    function (locale) {
        this.messageformat = new MessageFormat(locale);
    };
    MomentDateAdapter.decorators = [
        { type: core.Injectable },
    ];
    /** @nocollapse */
    MomentDateAdapter.ctorParameters = function () { return [
        { type: String, decorators: [{ type: core.Optional }, { type: core.Inject, args: [datetime.MC_DATE_LOCALE,] }] },
        { type: undefined, decorators: [{ type: core.Optional }, { type: core.Inject, args: [MC_MOMENT_DATE_ADAPTER_OPTIONS,] }] }
    ]; };
    return MomentDateAdapter;
}(datetime.DateAdapter));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var MomentDateModule = /** @class */ (function () {
    function MomentDateModule() {
    }
    MomentDateModule.decorators = [
        { type: core.NgModule, args: [{
                    providers: [
                        {
                            provide: datetime.DateAdapter,
                            useClass: MomentDateAdapter,
                            deps: [datetime.MC_DATE_LOCALE, MC_MOMENT_DATE_ADAPTER_OPTIONS]
                        }
                    ]
                },] },
    ];
    return MomentDateModule;
}());
var ɵ0 = MC_MOMENT_DATE_FORMATS;
var McMomentDateModule = /** @class */ (function () {
    function McMomentDateModule() {
    }
    McMomentDateModule.decorators = [
        { type: core.NgModule, args: [{
                    imports: [MomentDateModule],
                    providers: [{
                            provide: datetime.MC_DATE_FORMATS, useValue: ɵ0
                        }]
                },] },
    ];
    return McMomentDateModule;
}());

exports.MomentDateModule = MomentDateModule;
exports.McMomentDateModule = McMomentDateModule;
exports.MC_MOMENT_DATE_ADAPTER_OPTIONS_FACTORY = MC_MOMENT_DATE_ADAPTER_OPTIONS_FACTORY;
exports.MC_MOMENT_DATE_ADAPTER_OPTIONS = MC_MOMENT_DATE_ADAPTER_OPTIONS;
exports.MomentDateAdapter = MomentDateAdapter;
exports.MC_MOMENT_DATE_FORMATS = MC_MOMENT_DATE_FORMATS;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=mosaic-moment-adapter.umd.js.map
