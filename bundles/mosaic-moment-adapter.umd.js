/**
 * @license
 * Positive Technologies All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license.
 */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('messageformat'), require('moment'), require('@angular/core'), require('@ptsecurity/cdk/datetime'), require('@ptsecurity/cdk/platform')) :
	typeof define === 'function' && define.amd ? define('@ptsecurity/mosaic-moment-adapter', ['exports', 'messageformat', 'moment', '@angular/core', '@ptsecurity/cdk/datetime', '@ptsecurity/cdk/platform'], factory) :
	(factory((global.ng = global.ng || {}, global.ng['mosaic-moment-adapter'] = {}),global.messageformat,global.moment.moment,global.ng.core,global.ng.cdk.datetime,global.ng.cdk.platform));
}(this, (function (exports,MessageFormat,_rollupMoment__default,core,datetime,platform) { 'use strict';

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

/** @docs-private */
function createMissingDateForamtterError(provider) {
    return Error("McDateAdapter: No provider found for " + provider + ". You must import one of the existing " +
        "modules at your application root or provide a custom implementation or use exists ones.");
}

var moment = _rollupMoment__default__default || _rollupMoment__default;
var McDateFormatter = /** @class */ (function () {
    function McDateFormatter(config, locale) {
        this.config = config;
        this.locale = locale;
        this.errorText = 'Invalid date';
        this.configure();
    }
    Object.defineProperty(McDateFormatter.prototype, "moment", {
        get: function () {
            return this._moment;
        },
        enumerable: true,
        configurable: true
    });
    McDateFormatter.prototype.compileVariables = function (date, variables) {
        var compiledVariables = {};
        // tslint:disable-next-line:no-for-in
        for (var key in variables) {
            if (!variables.hasOwnProperty(key)) {
                continue;
            }
            var value = variables[key];
            compiledVariables[key] = date.format(value);
        }
        compiledVariables.CURRENT_YEAR = this.isCurrentYear(date);
        return compiledVariables;
    };
    McDateFormatter.prototype.relativeDate = function (value, template) {
        if (!this._moment.isMoment(value)) {
            throw new Error(this.errorText);
        }
        var now = this.momentWithLocale();
        var totalSeconds = now.diff(value, 'seconds');
        var totalMinutes = now.diff(value, 'minutes');
        var isToday = now.isSame(value, 'day');
        var isYesterday = now.add(-1, 'days').isSame(value, 'day');
        var templateVariables = __assign({}, this.config.variables, template.variables);
        var variables = this.compileVariables(value, templateVariables);
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
    McDateFormatter.prototype.relativeShortDate = function (date) {
        return this.relativeDate(date, this.config.relativeTemplates.short);
    };
    McDateFormatter.prototype.relativeLongDate = function (date) {
        return this.relativeDate(date, this.config.relativeTemplates.long);
    };
    McDateFormatter.prototype.absoluteDate = function (date, params, datetime$$1) {
        if (datetime$$1 === void 0) { datetime$$1 = false; }
        if (!this._moment.isMoment(date)) {
            throw new Error(this.errorText);
        }
        var variables = __assign({}, this.config.variables, params.variables);
        var template = datetime$$1 ? params.DATETIME : params.DATE;
        return this.messageformat.compile(template)(this.compileVariables(date, variables));
    };
    McDateFormatter.prototype.absoluteShortDate = function (date) {
        return this.absoluteDate(date, this.config.absoluteTemplates.short);
    };
    McDateFormatter.prototype.absoluteShortDateTime = function (date) {
        return this.absoluteDate(date, this.config.absoluteTemplates.short, true);
    };
    McDateFormatter.prototype.absoluteLongDate = function (date) {
        return this.absoluteDate(date, this.config.absoluteTemplates.long);
    };
    McDateFormatter.prototype.absoluteLongDateTime = function (date) {
        return this.absoluteDate(date, this.config.absoluteTemplates.long, true);
    };
    McDateFormatter.prototype.rangeDate = function (startDate, endDate, template) {
        if (!this._moment.isMoment(startDate) || !this._moment.isMoment(endDate)) {
            throw new Error(this.errorText);
        }
        var variables = __assign({}, this.config.variables, template.variables);
        var sameMonth = this.isSame('month', startDate, endDate);
        var startDateVariables = this.compileVariables(startDate, variables);
        startDateVariables.SAME_MONTH = sameMonth;
        var endDateVariables = this.compileVariables(endDate, variables);
        endDateVariables.SAME_MONTH = sameMonth;
        var params = __assign({}, variables, { START_DATE: this.messageformat.compile(template.START_DATE)(startDateVariables), END_DATE: this.messageformat.compile(template.END_DATE)(endDateVariables), SAME_MONTH: sameMonth });
        return this.messageformat.compile(template.DATE)(params);
    };
    McDateFormatter.prototype.rangeDateTime = function (startDate, endDate, template) {
        if (!this._moment.isMoment(startDate) || !this._moment.isMoment(endDate)) {
            throw new Error(this.errorText);
        }
        var variables = __assign({}, this.config.variables, template.variables);
        var sameMonth = this.isSame('month', startDate, endDate);
        var sameDay = this.isSame('day', startDate, endDate);
        var startDateVariables = this.compileVariables(startDate, variables);
        startDateVariables.SAME_MONTH = sameMonth;
        startDateVariables.SAME_DAY = sameDay;
        var endDateVariables = this.compileVariables(endDate, variables);
        endDateVariables.SAME_MONTH = sameMonth;
        endDateVariables.SAME_DAY = sameDay;
        var params = __assign({}, variables, { START_DATETIME: this.messageformat.compile(template.START_DATETIME)(startDateVariables), END_DATETIME: this.messageformat.compile(template.END_DATETIME)(endDateVariables), SAME_MONTH: sameMonth, SAME_DAY: sameDay });
        return this.messageformat.compile(template.DATETIME)(params);
    };
    McDateFormatter.prototype.rangeShortDate = function (startDate, endDate) {
        return this.rangeDate(startDate, endDate, this.config.rangeTemplates.short);
    };
    McDateFormatter.prototype.rangeShortDateTime = function (startDate, endDate) {
        return this.rangeDateTime(startDate, endDate, this.config.rangeTemplates.short);
    };
    McDateFormatter.prototype.rangeLongDate = function (startDate, endDate) {
        return this.rangeDate(startDate, endDate, this.config.rangeTemplates.long);
    };
    McDateFormatter.prototype.rangeLongDateTime = function (startDate, endDate) {
        return this.rangeDateTime(startDate, endDate, this.config.rangeTemplates.long);
    };
    McDateFormatter.prototype.rangeMiddleDateTime = function (startDate, endDate) {
        return this.rangeDateTime(startDate, endDate, this.config.rangeTemplates.middle);
    };
    McDateFormatter.prototype.isCurrentYear = function (value) {
        return this.momentWithLocale().isSame(value, 'year') ? 'yes' : 'no';
    };
    McDateFormatter.prototype.isSame = function (unit, startDate, endDate) {
        return startDate.isSame(endDate, unit) ? 'yes' : 'no';
    };
    McDateFormatter.prototype.momentWithLocale = function () {
        return this.moment().locale(this.locale);
    };
    McDateFormatter.prototype.configure = function () {
        this.configureMoment(this.locale);
        this.configureTranslator(this.locale);
    };
    McDateFormatter.prototype.configureTranslator = function (locale) {
        this.messageformat = new MessageFormat(locale);
    };
    McDateFormatter.prototype.configureMoment = function (locale) {
        this._moment = moment;
        var momentLocale = locale.substr(0, 2);
        this._moment.updateLocale(momentLocale, {
            monthsShort: {
                format: this.config.monthNames.short,
                standalone: this.config.monthNames.short
            }
        });
    };
    return McDateFormatter;
}());

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

var MC_DATE_FORMATTER_CONFIGS_SET = new core.InjectionToken('mc-date-formatter-configs-set');
var McDateFormatterConfigSet = /** @class */ (function () {
    function McDateFormatterConfigSet() {
    }
    return McDateFormatterConfigSet;
}());
var DEFAULT_MC_DATE_FORMATTER_CONFIGS_SET = {
    get 'en-US'() {
        return enUS;
    },
    get 'ru-RU'() {
        return ruRU;
    }
};

/** https://tools.ietf.org/html/rfc3339 */
var ISO_8601_REGEX = /^\d{4}-\d{2}-\d{2}(?:T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|(?:(?:\+|-)\d{2}:\d{2}))?)?$/;
var ɵ0 = function (i) { return String(i + 1); };
/** The default date names to use if Intl API is not available. */
var DEFAULT_DATE_NAMES = range(31, ɵ0);
/** Creates an array and fills it with values. */
function range(length, valueFunction) {
    var valuesArray = Array(length);
    for (var i = 0; i < length; i++) {
        valuesArray[i] = valueFunction(i);
    }
    return valuesArray;
}
var MosaicDateAdapter = /** @class */ (function (_super) {
    __extends(MosaicDateAdapter, _super);
    function MosaicDateAdapter(mcDateLocale, formatterConfigsSet) {
        var _this = _super.call(this) || this;
        _this.formatterConfigsSet = formatterConfigsSet;
        _super.prototype.setLocale.call(_this, mcDateLocale);
        if (!_this.formatterConfigsSet) {
            throw createMissingDateForamtterError('MC_DATE_FORMATTER_CONFIGS_SET');
        }
        var formatter = new McDateFormatter(_this.formatterConfig, _this.locale);
        _this.moment = formatter.moment;
        return _this;
    }
    Object.defineProperty(MosaicDateAdapter.prototype, "formatterConfig", {
        get: function () {
            var config = this.formatterConfigsSet[this.locale];
            if (!config) {
                throw Error("There is no formatter config for locale: " + this.locale);
            }
            return config;
        },
        enumerable: true,
        configurable: true
    });
    MosaicDateAdapter.prototype.getYear = function (date) {
        return date.getFullYear();
    };
    MosaicDateAdapter.prototype.getMonth = function (date) {
        return date.getMonth();
    };
    MosaicDateAdapter.prototype.getDate = function (date) {
        return date.getDate();
    };
    MosaicDateAdapter.prototype.getDayOfWeek = function (date) {
        return date.getDay();
    };
    MosaicDateAdapter.prototype.getMonthNames = function (style) {
        return this.formatterConfig.monthNames[style];
    };
    MosaicDateAdapter.prototype.getDateNames = function () {
        return DEFAULT_DATE_NAMES;
    };
    MosaicDateAdapter.prototype.getDayOfWeekNames = function (style) {
        return this.formatterConfig.dayOfWeekNames[style];
    };
    MosaicDateAdapter.prototype.getYearName = function (date) {
        return String(this.getYear(date));
    };
    MosaicDateAdapter.prototype.getFirstDayOfWeek = function () {
        switch (this.locale) {
            case 'ru-RU':
                return 1;
            case 'en-US':
                return 0;
            default:
                return 1;
        }
    };
    MosaicDateAdapter.prototype.getNumDaysInMonth = function (date) {
        return this.getDate(this.createDateWithOverflow(this.getYear(date), this.getMonth(date) + 1, 0));
    };
    MosaicDateAdapter.prototype.clone = function (date) {
        return new Date(date.getTime());
    };
    MosaicDateAdapter.prototype.createDate = function (year, month, date) {
        if (month < 0 || month > 11) {
            throw Error("Invalid month index \"" + month + "\". Month index has to be between 0 and 11.");
        }
        if (date < 1) {
            throw Error("Invalid date \"" + date + "\". Date has to be greater than 0.");
        }
        var result = this.createDateWithOverflow(year, month, date);
        if (result.getMonth() !== month) {
            throw Error("Invalid date \"" + date + "\" for month with index \"" + month + "\".");
        }
        return result;
    };
    MosaicDateAdapter.prototype.today = function () {
        return new Date();
    };
    MosaicDateAdapter.prototype.parse = function (value, parseFormat) {
        if (value && typeof value === 'string') {
            return this.moment(value, parseFormat).toDate();
        }
        return value ? this.moment(value).toDate() : null;
    };
    MosaicDateAdapter.prototype.format = function (date, displayFormat) {
        if (!this.isValid(date)) {
            throw Error('MosaicDateAdapter: Cannot format invalid date.');
        }
        return this.moment(date).format(displayFormat);
    };
    MosaicDateAdapter.prototype.addCalendarYears = function (date, years) {
        return this.addCalendarMonths(date, years * 12);
    };
    MosaicDateAdapter.prototype.addCalendarMonths = function (date, months) {
        var newDate = this.createDateWithOverflow(this.getYear(date), this.getMonth(date) + months, this.getDate(date));
        if (this.getMonth(newDate) !== ((this.getMonth(date) + months) % 12 + 12) % 12) {
            newDate = this.createDateWithOverflow(this.getYear(newDate), this.getMonth(newDate), 0);
        }
        return newDate;
    };
    MosaicDateAdapter.prototype.addCalendarDays = function (date, days) {
        return this.createDateWithOverflow(this.getYear(date), this.getMonth(date), this.getDate(date) + days);
    };
    MosaicDateAdapter.prototype.toIso8601 = function (date) {
        return [
            date.getUTCFullYear(),
            this.toDigit(date.getUTCMonth() + 1),
            this.toDigit(date.getUTCDate())
        ].join('-');
    };
    /** https://www.ietf.org/rfc/rfc3339.txt */
    MosaicDateAdapter.prototype.deserialize = function (value) {
        if (typeof value === 'string') {
            if (!value) {
                return null;
            }
            // The `Date` constructor accepts formats other than ISO 8601, so we need to make sure the
            // string is the right format first.
            if (ISO_8601_REGEX.test(value)) {
                var date = new Date(value);
                if (this.isValid(date)) {
                    return date;
                }
            }
        }
        return _super.prototype.deserialize.call(this, value);
    };
    MosaicDateAdapter.prototype.isDateInstance = function (obj) {
        return obj instanceof Date;
    };
    MosaicDateAdapter.prototype.isValid = function (date) {
        return !isNaN(date.getTime());
    };
    MosaicDateAdapter.prototype.invalid = function () {
        return new Date(NaN);
    };
    /** Creates a date but allows the month and date to overflow. */
    MosaicDateAdapter.prototype.createDateWithOverflow = function (year, month, date) {
        var result = new Date(year, month, date);
        // We need to correct for the fact that JS native Date treats years in range [0, 99] as
        // abbreviations for 19xx.
        if (year >= 0 && year < 100) {
            result.setFullYear(this.getYear(result) - 1900);
        }
        return result;
    };
    MosaicDateAdapter.prototype.toDigit = function (n) {
        return ("00" + n).slice(-2);
    };
    MosaicDateAdapter = __decorate([
        core.Injectable(),
        __param(0, core.Optional()), __param(0, core.Inject(datetime.MC_DATE_LOCALE)),
        __param(1, core.Optional()), __param(1, core.Inject(MC_DATE_FORMATTER_CONFIGS_SET)),
        __metadata("design:paramtypes", [String, McDateFormatterConfigSet])
    ], MosaicDateAdapter);
    return MosaicDateAdapter;
}(datetime.DateAdapter));

var MC_MOSAIC_DATE_FORMATS = {
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

var ɵ0$1 = DEFAULT_MC_DATE_FORMATTER_CONFIGS_SET, ɵ1 = MC_MOSAIC_DATE_FORMATS;
var MosaicDateModule = /** @class */ (function () {
    function MosaicDateModule() {
    }
    MosaicDateModule = __decorate([
        core.NgModule({
            imports: [platform.PlatformModule],
            providers: [
                { provide: datetime.DateAdapter, useClass: MosaicDateAdapter },
                { provide: MC_DATE_FORMATTER_CONFIGS_SET, useValue: ɵ0$1 },
                { provide: datetime.MC_DATE_FORMATS, useValue: ɵ1 }
            ]
        })
    ], MosaicDateModule);
    return MosaicDateModule;
}());

/** Current version of the Component Development Kit. */
var VERSION = new core.Version('1.0.0-beta.0');

exports.VERSION = VERSION;
exports.MosaicDateAdapter = MosaicDateAdapter;
exports.ɵ0 = ɵ0;
exports.MosaicDateModule = MosaicDateModule;
exports.ɵ1 = ɵ1;
exports.MC_MOSAIC_DATE_FORMATS = MC_MOSAIC_DATE_FORMATS;
exports.McDateFormatter = McDateFormatter;
exports.MC_DATE_FORMATTER_CONFIGS_SET = MC_DATE_FORMATTER_CONFIGS_SET;
exports.McDateFormatterConfigSet = McDateFormatterConfigSet;
exports.DEFAULT_MC_DATE_FORMATTER_CONFIGS_SET = DEFAULT_MC_DATE_FORMATTER_CONFIGS_SET;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=mosaic-moment-adapter.umd.js.map
