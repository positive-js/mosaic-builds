/**
 * @license
 * Positive Technologies All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license.
 */
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@ptsecurity/cdk/datetime'), require('messageformat'), require('moment')) :
    typeof define === 'function' && define.amd ? define('@ptsecurity/mosaic-moment-adapter', ['exports', '@angular/core', '@ptsecurity/cdk/datetime', 'messageformat', 'moment'], factory) :
    (global = global || self, factory((global.ng = global.ng || {}, global.ng.mosaicMomentAdapter = {}), global.ng.core, global.ng.cdk.datetime, global.messageformat, global.moment));
}(this, (function (exports, core, datetime, MessageFormat, _rollupMoment__default) { 'use strict';

    var _rollupMoment__default__default = 'default' in _rollupMoment__default ? _rollupMoment__default['default'] : _rollupMoment__default;

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
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
            short: {
                standalone: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                formatted: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
            },
            narrow: ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D']
        },
        dayOfWeekNames: {
            long: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
            short: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
            narrow: ['S', 'M', 'T', 'W', 'T', 'F', 'S']
        },
        relativeTemplates: {
            short: {
                SECONDS_AGO: 'Just now',
                MINUTES_AGO: '{MINUTES_PASSED}{NBSP}min ago',
                TODAY: '{TIME}',
                YESTERDAY: 'Yesterday, {TIME}',
                BEFORE_YESTERDAY: '{CURRENT_YEAR, select, yes{{SHORT_DATE}, {TIME}} other{{SHORT_DATE}, {YEAR}}}'
            },
            long: {
                SECONDS_AGO: 'Just now',
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
            closedRange: {
                short: {
                    START_DATE: '{CURRENT_YEAR, select, yes{{SHORT_DATE}} other{{SHORT_DATE}, {YEAR}}}',
                    END_DATE: "{\n                    SAME_MONTH,\n                    select,\n                        yes{{DAY}}\n                        other{{\n                            CURRENT_YEAR,\n                            select,\n                                yes{{SHORT_DATE}}\n                                other{{SHORT_DATE}, {YEAR}}\n                        }}\n                }",
                    DATE: "{\n                    SAME_MONTH,\n                    select,\n                        yes{{START_DATE}{DASH}{END_DATE}}\n                        other{{START_DATE}{LONG_DASH}{END_DATE}}\n                }",
                    START_DATETIME: "{\n                    SAME_DAY,\n                    select,\n                        yes{{TIME}}\n                        other{{\n                            CURRENT_YEAR,\n                            select,\n                                yes{{SHORT_DATE}, {TIME}}\n                                other{{SHORT_DATE}, {YEAR}, {TIME}}\n                        }}\n                }",
                    END_DATETIME: "{\n                    SAME_DAY,\n                    select,\n                        yes{{\n                            CURRENT_YEAR,\n                            select,\n                                yes{{TIME}, {SHORT_DATE}}\n                                other{{TIME}, {SHORT_DATE}, {YEAR}}\n                        }}\n                        other{{\n                            CURRENT_YEAR,\n                            select,\n                                yes{{SHORT_DATE}, {TIME}}\n                                other{{SHORT_DATE}, {YEAR}, {TIME}}\n                        }}\n                }",
                    DATETIME: "{\n                    SAME_DAY,\n                    select,\n                        yes{{START_DATETIME}{DASH}{END_DATETIME}}\n                        other{{START_DATETIME}{LONG_DASH}{END_DATETIME}}\n                }"
                },
                middle: {
                    START_DATE: "{\n                    SAME_MONTH,\n                    select,\n                        yes{{DAY}}\n                        other{{\n                            CURRENT_YEAR,\n                            select,\n                                yes{{DATE}}\n                                other{{DATE}, {YEAR}}\n                        }}\n                }",
                    END_DATE: '{CURRENT_YEAR, select, yes{{DATE}} other{{DATE}, {YEAR}}}',
                    DATE: "{\n                    SAME_MONTH,\n                    select,\n                        yes{{START_DATE}{DASH}{END_DATE}}\n                        other{{START_DATE}{LONG_DASH}{END_DATE}}\n                }",
                    START_DATETIME: "{\n                    SAME_DAY,\n                    select,\n                        yes{{TIME}}\n                        other{{\n                            CURRENT_YEAR,\n                            select,\n                                yes{{DATE}, {TIME}}\n                                other{{DATE}, {YEAR}, {TIME}}\n                        }}\n                }",
                    END_DATETIME: "{\n                    SAME_DAY,\n                    select,\n                        yes{{\n                            CURRENT_YEAR,\n                            select,\n                                yes{{TIME}, {DATE}}\n                                other{{TIME}, {DATE}, {YEAR}}\n                        }}\n                        other{{\n                            CURRENT_YEAR,\n                            select,\n                                yes{{DATE}, {TIME}}\n                                other{{DATE}, {YEAR}, {TIME}}\n                        }}\n                }",
                    DATETIME: "{\n                    SAME_DAY,\n                    select,\n                        yes{{START_DATETIME}{DASH}{END_DATETIME}}\n                        other{{START_DATETIME}{LONG_DASH}{END_DATETIME}}\n                }"
                },
                long: {
                    START_DATE: '{CURRENT_YEAR, select, yes{{DATE}} other{{DATE}, {YEAR}}}',
                    END_DATE: "{\n                    SAME_MONTH,\n                    select,\n                        yes{{DAY}}\n                        other{{\n                            CURRENT_YEAR,\n                            select,\n                                yes{{DATE}}\n                                other{{DATE}, {YEAR}}\n                        }}\n                }",
                    DATE: "{\n                    SAME_MONTH,\n                    select,\n                        yes{{START_DATE}{DASH}{END_DATE}}\n                        other{{START_DATE}{LONG_DASH}{END_DATE}}\n                }",
                    START_DATETIME: "{\n                    SAME_DAY,\n                    select,\n                        yes{{\n                            CURRENT_YEAR,\n                            select,\n                                yes{{DATE}, from{NBSP}{TIME}}\n                                other{{DATE}, {YEAR}, from{NBSP}{TIME}}\n                        }}\n                        other{{\n                            CURRENT_YEAR,\n                            select,\n                                yes{{DATE}, {TIME}}\n                                other{{DATE}, {YEAR}, {TIME}}\n                        }}\n                }",
                    END_DATETIME: "{\n                    SAME_DAY,\n                    select,\n                        yes{to{NBSP}{TIME}}\n                        other{{\n                            CURRENT_YEAR,\n                            select,\n                                yes{{DATE}, {TIME}}\n                                other{{DATE}, {YEAR}, {TIME}}\n                        }}\n                }",
                    DATETIME: "{\n                    SAME_DAY,\n                    select,\n                        yes{{START_DATETIME} {END_DATETIME}}\n                        other{From {START_DATETIME} to{NBSP}{END_DATETIME}}\n                }"
                }
            },
            openedRange: {
                short: {
                    START_DATE: "{\n                    CURRENT_YEAR,\n                    select,\n                        yes{{SHORT_DATE}}\n                        other{{SHORT_DATE} {YEAR}}\n                }",
                    END_DATE: '{CURRENT_YEAR, select, yes{{SHORT_DATE}} other{{SHORT_DATE} {YEAR}}}',
                    DATE: "{\n                    RANGE_TYPE,\n                    select,\n                        onlyStart{From{NBSP}{START_DATE}}\n                        other{Until{NBSP}{END_DATE}}\n                }",
                    START_DATETIME: "{\n                    CURRENT_YEAR,\n                    select,\n                        yes{{SHORT_DATE}, {TIME}}\n                        other{{SHORT_DATE} {YEAR}, {TIME}}\n                }",
                    END_DATETIME: "{\n                    CURRENT_YEAR,\n                    select,\n                        yes{{SHORT_DATE}, {TIME}}\n                        other{{SHORT_DATE} {YEAR}, {TIME}}\n                }",
                    DATETIME: "{\n                    RANGE_TYPE,\n                    select,\n                        onlyStart{From{NBSP}{START_DATETIME}}\n                        other{Until{NBSP}{END_DATETIME}}\n                }"
                },
                long: {
                    START_DATE: "{\n                    CURRENT_YEAR,\n                    select,\n                        yes{{DATE}}\n                        other{{DATE} {YEAR}}\n                }",
                    END_DATE: '{CURRENT_YEAR, select, yes{{DATE}} other{{DATE} {YEAR}}}',
                    DATE: "{\n                    RANGE_TYPE,\n                    select,\n                        onlyStart{From{NBSP}{START_DATE}}\n                        other{Until{NBSP}{END_DATE}}\n                }",
                    START_DATETIME: "{\n                    CURRENT_YEAR,\n                    select,\n                        yes{{DATE}, {TIME}}\n                        other{{DATE} {YEAR}, {TIME}}\n                }",
                    END_DATETIME: "{\n                    CURRENT_YEAR,\n                    select,\n                        yes{{DATE}, {TIME}}\n                        other{{DATE} {YEAR}, {TIME}}\n                }",
                    DATETIME: "{\n                    RANGE_TYPE,\n                    select,\n                        onlyStart{From{NBSP}{START_DATETIME}}\n                        other{Until{NBSP}{END_DATETIME}}\n                }"
                }
            }
        }
    };

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
            short: {
                standalone: ['янв', 'фев', 'март', 'апр', 'май', 'июнь', 'июль', 'авг', 'сен', 'окт', 'ноя', 'дек'],
                formatted: ['янв', 'фев', 'мар', 'апр', 'мая', 'июня', 'июля', 'авг', 'сен', 'окт', 'ноя', 'дек']
            },
            narrow: ['Я', 'Ф', 'М', 'А', 'М', 'И', 'И', 'А', 'С', 'О', 'Н', 'Д']
        },
        dayOfWeekNames: {
            long: ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
            short: ['вс', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб'],
            narrow: ['В', 'П', 'В', 'С', 'Ч', 'П', 'С']
        },
        relativeTemplates: {
            short: {
                SECONDS_AGO: 'Только что',
                MINUTES_AGO: '{MINUTES_PASSED}{NBSP}мин назад',
                TODAY: '{TIME}',
                YESTERDAY: 'Вчера, {TIME}',
                BEFORE_YESTERDAY: '{CURRENT_YEAR, select, yes{{SHORT_DATE}, {TIME}} other{{SHORT_DATE}, {YEAR}}}'
            },
            long: {
                SECONDS_AGO: 'Только что',
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
            closedRange: {
                short: {
                    START_DATE: "{\n                    SAME_MONTH,\n                    select,\n                        yes{{DAY}}\n                        other{{\n                            CURRENT_YEAR,\n                            select,\n                                yes{{SHORT_DATE}}\n                                other{{SHORT_DATE} {YEAR}}\n                        }}\n                }",
                    END_DATE: '{CURRENT_YEAR, select, yes{{SHORT_DATE}} other{{SHORT_DATE} {YEAR}}}',
                    DATE: "{\n                    SAME_MONTH,\n                    select,\n                        yes{{START_DATE}{DASH}{END_DATE}}\n                        other{{START_DATE}{LONG_DASH}{END_DATE}}\n                }",
                    START_DATETIME: "{\n                    SAME_DAY,\n                    select,\n                        yes{{TIME}}\n                        other{{\n                            CURRENT_YEAR,\n                            select,\n                                yes{{SHORT_DATE}, {TIME}}\n                                other{{SHORT_DATE} {YEAR}, {TIME}}\n                        }}\n                }",
                    END_DATETIME: "{\n                    SAME_DAY,\n                    select,\n                        yes{{\n                            CURRENT_YEAR,\n                            select,\n                                yes{{TIME}, {SHORT_DATE}}\n                                other{{TIME}, {SHORT_DATE} {YEAR}}\n                        }}\n                        other{{\n                            CURRENT_YEAR,\n                            select,\n                                yes{{SHORT_DATE}, {TIME}}\n                                other{{SHORT_DATE} {YEAR}, {TIME}}\n                        }}\n                }",
                    DATETIME: "{\n                    SAME_DAY,\n                    select,\n                        yes{{START_DATETIME}{DASH}{END_DATETIME}}\n                        other{{START_DATETIME}{LONG_DASH}{END_DATETIME}}\n                }"
                },
                middle: {
                    START_DATE: "{\n                    SAME_MONTH,\n                    select,\n                        yes{{DAY}}\n                        other{{\n                            CURRENT_YEAR,\n                            select,\n                                yes{{DATE}}\n                                other{{DATE} {YEAR}}\n                        }}\n                }",
                    END_DATE: '{CURRENT_YEAR, select, yes{{DATE}} other{{DATE} {YEAR}}}',
                    DATE: "{\n                    SAME_MONTH,\n                    select,\n                        yes{{START_DATE}{DASH}{END_DATE}}\n                        other{{START_DATE}{LONG_DASH}{END_DATE}}\n                }",
                    START_DATETIME: "{\n                    SAME_DAY,\n                    select,\n                        yes{{TIME}}\n                        other{{\n                            CURRENT_YEAR,\n                            select,\n                                yes{{DATE}, {TIME}}\n                                other{{DATE} {YEAR}, {TIME}}\n                        }}\n                }",
                    END_DATETIME: "{\n                    SAME_DAY,\n                    select,\n                        yes{{\n                            CURRENT_YEAR,\n                            select,\n                                yes{{TIME}, {DATE}}\n                                other{{TIME}, {DATE} {YEAR}}\n                        }}\n                        other{{\n                            CURRENT_YEAR,\n                            select,\n                                yes{{DATE}, {TIME}}\n                                other{{DATE} {YEAR}, {TIME}}\n                        }}\n                }",
                    DATETIME: "{\n                    SAME_DAY,\n                    select,\n                        yes{{START_DATETIME}{DASH}{END_DATETIME}}\n                        other{{START_DATETIME}{LONG_DASH}{END_DATETIME}}\n                }"
                },
                long: {
                    START_DATE: "{\n                    SAME_MONTH,\n                    select,\n                        yes{{DAY}}\n                        other{{\n                            CURRENT_YEAR,\n                            select,\n                                yes{{DATE}}\n                                other{{DATE} {YEAR}}\n                        }}\n                }",
                    END_DATE: '{CURRENT_YEAR, select, yes{{DATE}} other{{DATE} {YEAR}}}',
                    DATE: "{\n                    SAME_MONTH,\n                    select,\n                        yes{{START_DATE}{DASH}{END_DATE}}\n                        other{{START_DATE}{LONG_DASH}{END_DATE}}\n                }",
                    START_DATETIME: "{\n                    SAME_DAY,\n                    select,\n                        yes{{\n                            CURRENT_YEAR,\n                            select,\n                                yes{{DATE}, \u0441{NBSP}{TIME}}\n                                other{{DATE} {YEAR}, \u0441{NBSP}{TIME}}\n                        }}\n                        other{{\n                            CURRENT_YEAR,\n                            select,\n                                yes{{DATE}, {TIME}}\n                                other{{DATE} {YEAR}, {TIME}}\n                        }}\n                }",
                    END_DATETIME: "{\n                    SAME_DAY,\n                    select,\n                        yes{\u043F\u043E{NBSP}{TIME}}\n                        other{{\n                            CURRENT_YEAR,\n                            select,\n                                yes{{DATE}, {TIME}}\n                                other{{DATE} {YEAR}, {TIME}}\n                        }}\n                }",
                    DATETIME: "{\n                    SAME_DAY,\n                    select,\n                        yes{{START_DATETIME} {END_DATETIME}}\n                        other{\u0421{NBSP}{START_DATETIME} \u043F\u043E{NBSP}{END_DATETIME}}\n                }"
                }
            },
            openedRange: {
                short: {
                    START_DATE: "{\n                    CURRENT_YEAR,\n                    select,\n                        yes{{SHORT_DATE}}\n                        other{{SHORT_DATE} {YEAR}}\n                }",
                    END_DATE: '{CURRENT_YEAR, select, yes{{SHORT_DATE}} other{{SHORT_DATE} {YEAR}}}',
                    DATE: "{\n                    RANGE_TYPE,\n                    select,\n                        onlyStart{\u0421{NBSP}{START_DATE}}\n                        other{\u041F\u043E{NBSP}{END_DATE}}\n                }",
                    START_DATETIME: "{\n                    CURRENT_YEAR,\n                    select,\n                        yes{{SHORT_DATE}, {TIME}}\n                        other{{SHORT_DATE} {YEAR}, {TIME}}\n                }",
                    END_DATETIME: "{\n                    CURRENT_YEAR,\n                    select,\n                        yes{{SHORT_DATE}, {TIME}}\n                        other{{SHORT_DATE} {YEAR}, {TIME}}\n                }",
                    DATETIME: "{\n                    RANGE_TYPE,\n                    select,\n                        onlyStart{\u0421{NBSP}{START_DATETIME}}\n                        other{\u041F\u043E{NBSP}{END_DATETIME}}\n                }"
                },
                long: {
                    START_DATE: "{\n                    CURRENT_YEAR,\n                    select,\n                        yes{{DATE}}\n                        other{{DATE} {YEAR}}\n                }",
                    END_DATE: '{CURRENT_YEAR, select, yes{{DATE}} other{{DATE} {YEAR}}}',
                    DATE: "{\n                    RANGE_TYPE,\n                    select,\n                        onlyStart{\u0421{NBSP}{START_DATE}}\n                        other{\u041F\u043E{NBSP}{END_DATE}}\n                }",
                    START_DATETIME: "{\n                    CURRENT_YEAR,\n                    select,\n                        yes{{DATE}, {TIME}}\n                        other{{DATE} {YEAR}, {TIME}}\n                }",
                    END_DATETIME: "{\n                    CURRENT_YEAR,\n                    select,\n                        yes{{DATE}, {TIME}}\n                        other{{DATE} {YEAR}, {TIME}}\n                }",
                    DATETIME: "{\n                    RANGE_TYPE,\n                    select,\n                        onlyStart{\u0421{NBSP}{START_DATETIME}}\n                        other{\u041F\u043E{NBSP}{END_DATETIME}}\n                }"
                }
            }
        }
    };

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
            useUtc: false,
            findDateFormat: false
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
                        format: this.formatterConfig.monthNames.short.formatted,
                        standalone: this.formatterConfig.monthNames.short.standalone
                    },
                    weekdaysShort: this.formatterConfig.dayOfWeekNames.short,
                    weekdays: this.formatterConfig.dayOfWeekNames.long
                });
            }
            this.localeData = {
                firstDayOfWeek: momentLocaleData.firstDayOfWeek(),
                longMonths: momentLocaleData.months(),
                shortMonths: momentLocaleData.monthsShort(),
                dates: range(31, (/**
                 * @param {?} i
                 * @return {?}
                 */
                function (i) { return _this.createDate(2017, 0, i + 1).format('D'); })),
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
        MomentDateAdapter.prototype.getHours = /**
         * @param {?} date
         * @return {?}
         */
        function (date) {
            return this.clone(date).hours();
        };
        /**
         * @param {?} date
         * @return {?}
         */
        MomentDateAdapter.prototype.getMinutes = /**
         * @param {?} date
         * @return {?}
         */
        function (date) {
            return this.clone(date).minutes();
        };
        /**
         * @param {?} date
         * @return {?}
         */
        MomentDateAdapter.prototype.getSeconds = /**
         * @param {?} date
         * @return {?}
         */
        function (date) {
            return this.clone(date).seconds();
        };
        /**
         * @param {?} date
         * @return {?}
         */
        MomentDateAdapter.prototype.getMilliseconds = /**
         * @param {?} date
         * @return {?}
         */
        function (date) {
            return this.clone(date).milliseconds();
        };
        /**
         * @param {?} date
         * @return {?}
         */
        MomentDateAdapter.prototype.getTime = /**
         * @param {?} date
         * @return {?}
         */
        function (date) {
            return date.valueOf();
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
         * @param {?} year
         * @param {?} month
         * @param {?} date
         * @param {?} hours
         * @param {?} minutes
         * @param {?} seconds
         * @param {?} milliseconds
         * @return {?}
         */
        MomentDateAdapter.prototype.createDateTime = /**
         * @param {?} year
         * @param {?} month
         * @param {?} date
         * @param {?} hours
         * @param {?} minutes
         * @param {?} seconds
         * @param {?} milliseconds
         * @return {?}
         */
        function (year, month, date, hours, minutes, seconds, milliseconds) {
            /** @type {?} */
            var newDate = this.createDate(year, month, date);
            newDate.hours(hours);
            newDate.minutes(minutes);
            newDate.seconds(seconds);
            newDate.milliseconds(milliseconds);
            return newDate;
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
            if (value) {
                if (value && typeof value === 'string') {
                    if (this.options && this.options.findDateFormat) {
                        return this.findFormat(value);
                    }
                    return parseFormat
                        ? this.createMoment(value, parseFormat, this.locale)
                        : this.createMoment(value).locale(this.locale);
                }
                return this.createMoment(value).locale(this.locale);
            }
            return null;
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
        function (date, params, datetime) {
            if (datetime === void 0) { datetime = false; }
            if (!this.isDateInstance(date)) {
                throw new Error(this.invalidDateErrorText);
            }
            /** @type {?} */
            var variables = __assign({}, this.formatterConfig.variables, params.variables);
            /** @type {?} */
            var template = datetime ? params.DATETIME : params.DATE;
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
        MomentDateAdapter.prototype.openedRangeDate = /**
         * @param {?} startDate
         * @param {?} endDate
         * @param {?} template
         * @return {?}
         */
        function (startDate, endDate, template) {
            if (!moment.isMoment(startDate) && !moment.isMoment(endDate)) {
                throw new Error(this.invalidDateErrorText);
            }
            /** @type {?} */
            var variables = __assign({}, this.formatterConfig.variables, template.variables);
            /** @type {?} */
            var params = {};
            if (startDate) {
                /** @type {?} */
                var startDateVariables = this.compileVariables(startDate, variables);
                params = __assign({}, variables, { START_DATE: this.messageformat.compile(template.START_DATE)(startDateVariables), RANGE_TYPE: 'onlyStart' });
            }
            else if (endDate) {
                /** @type {?} */
                var endDateVariables = this.compileVariables(endDate, variables);
                params = __assign({}, variables, { END_DATE: this.messageformat.compile(template.END_DATE)(endDateVariables), RANGE_TYPE: 'onlyEnd' });
            }
            return this.messageformat.compile(template.DATE)(params);
        };
        /**
         * @param {?} startDate
         * @param {?} endDate
         * @param {?} template
         * @return {?}
         */
        MomentDateAdapter.prototype.openedRangeDateTime = /**
         * @param {?} startDate
         * @param {?} endDate
         * @param {?} template
         * @return {?}
         */
        function (startDate, endDate, template) {
            if (!moment.isMoment(startDate) && !moment.isMoment(endDate)) {
                throw new Error(this.invalidDateErrorText);
            }
            /** @type {?} */
            var variables = __assign({}, this.formatterConfig.variables, template.variables);
            /** @type {?} */
            var params = {};
            if (startDate) {
                /** @type {?} */
                var startDateVariables = this.compileVariables(startDate, variables);
                params = __assign({}, variables, { START_DATETIME: this.messageformat.compile(template.START_DATETIME)(startDateVariables), RANGE_TYPE: 'onlyStart' });
            }
            else if (endDate) {
                /** @type {?} */
                var endDateVariables = this.compileVariables(endDate, variables);
                params = __assign({}, variables, { END_DATETIME: this.messageformat.compile(template.END_DATETIME)(endDateVariables), RANGE_TYPE: 'onlyEnd' });
            }
            return this.messageformat.compile(template.DATETIME)(params);
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
         * @param {?=} endDate
         * @return {?}
         */
        MomentDateAdapter.prototype.rangeShortDate = /**
         * @param {?} startDate
         * @param {?=} endDate
         * @return {?}
         */
        function (startDate, endDate) {
            /** @type {?} */
            var rangeTemplates = this.formatterConfig.rangeTemplates;
            if (startDate && endDate) {
                return this.rangeDate(startDate, endDate, rangeTemplates.closedRange.short);
            }
            return this.openedRangeDate(startDate, endDate || null, rangeTemplates.openedRange.short);
        };
        /**
         * @param {?} startDate
         * @param {?=} endDate
         * @return {?}
         */
        MomentDateAdapter.prototype.rangeShortDateTime = /**
         * @param {?} startDate
         * @param {?=} endDate
         * @return {?}
         */
        function (startDate, endDate) {
            /** @type {?} */
            var rangeTemplates = this.formatterConfig.rangeTemplates;
            if (startDate && endDate) {
                return this.rangeDateTime(startDate, endDate, rangeTemplates.closedRange.short);
            }
            return this.openedRangeDateTime(startDate, endDate || null, rangeTemplates.openedRange.short);
        };
        /**
         * @param {?} startDate
         * @param {?=} endDate
         * @return {?}
         */
        MomentDateAdapter.prototype.rangeLongDate = /**
         * @param {?} startDate
         * @param {?=} endDate
         * @return {?}
         */
        function (startDate, endDate) {
            /** @type {?} */
            var rangeTemplates = this.formatterConfig.rangeTemplates;
            if (startDate && endDate) {
                return this.rangeDate(startDate, endDate, rangeTemplates.closedRange.long);
            }
            return this.openedRangeDate(startDate, endDate || null, rangeTemplates.openedRange.long);
        };
        /**
         * @param {?} startDate
         * @param {?=} endDate
         * @return {?}
         */
        MomentDateAdapter.prototype.rangeLongDateTime = /**
         * @param {?} startDate
         * @param {?=} endDate
         * @return {?}
         */
        function (startDate, endDate) {
            /** @type {?} */
            var rangeTemplates = this.formatterConfig.rangeTemplates;
            if (startDate && endDate) {
                return this.rangeDateTime(startDate, endDate, rangeTemplates.closedRange.long);
            }
            return this.openedRangeDateTime(startDate, endDate || null, rangeTemplates.openedRange.long);
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
            return this.rangeDateTime(startDate, endDate, this.formatterConfig.rangeTemplates.closedRange.middle);
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
        /**
         * @private
         * @param {?} value
         * @return {?}
         */
        MomentDateAdapter.prototype.isNumeric = /**
         * @private
         * @param {?} value
         * @return {?}
         */
        function (value) {
            return !isNaN(parseFloat(value)) && isFinite(value);
        };
        /**
         * @private
         * @param {?} value
         * @return {?}
         */
        MomentDateAdapter.prototype.findFormat = /**
         * @private
         * @param {?} value
         * @return {?}
         */
        function (value) {
            if (!value) {
                return null;
            }
            // default test - iso
            /** @type {?} */
            var isoDate = this.createMoment(value, moment.ISO_8601, this.locale);
            if (isoDate.isValid()) {
                return isoDate;
            }
            if (this.isNumeric(value)) {
                // unix time sec
                return this.createMoment(value, 'X', this.locale);
            }
            // long months naming: D MMM YYYY, MMM Do YYYY with short case support
            if (/^\d{1,2}\s\S+\s(\d{2}|\d{4})$/.test(value.trim()) ||
                /^\S+\s\d{1,2}[a-z]{2}\s(\d{2}|\d{4})$/.test(value.trim())) {
                return this.parseWithSpace(value);
            }
            // slash notation: DD/MM/YYYY, MM/DD/YYYY with short case support
            if (/^\d{1,2}\/\d{1,2}\/(\d{2}|\d{4})$/.test(value)) {
                return this.parseWithSlash(value);
            }
            // dash notation: DD-MM-YYYY, YYYY-DD-MM with short case support
            if (/(^(\d{1,2}|\d{4})-\d{1,2}-\d{1,2}$)|(^\d{1,2}-\d{1,2}-(\d{2}|\d{4})$)/.test(value)) {
                return this.parseWithDash(value);
            }
            // dot notation: DD.MM.YYYY with short case support
            if (/^\d{1,2}\.\d{1,2}\.(\d{2}|\d{4})$/.test(value)) {
                return this.parseWithDot(value);
            }
            return null;
        };
        /**
         * @private
         * @param {?} value
         * @return {?}
         */
        MomentDateAdapter.prototype.parseWithSpace = /**
         * @private
         * @param {?} value
         * @return {?}
         */
        function (value) {
            switch (this.locale) {
                case 'ru':
                    return this.createMoment(value, 'DD MMMM YYYY', this.locale);
                case 'en':
                    // 16 Feb 2019 vs Feb 16th 2019, covers Feb and February cases
                    if (this.isNumeric(value[0])) {
                        return this.createMoment(value, 'D MMMM YYYY', this.locale);
                    }
                    return this.createMoment(value, 'MMMM Do YYYY', this.locale);
                default:
                    throw new Error("Locale " + this.locale + " is not supported");
            }
        };
        /**
         * @private
         * @param {?} value
         * @return {?}
         */
        MomentDateAdapter.prototype.parseWithSlash = /**
         * @private
         * @param {?} value
         * @return {?}
         */
        function (value) {
            switch (this.locale) {
                case 'ru':
                    return this.createMoment(value, 'DD/MM/YYYY', this.locale);
                // todo do we use generalized locales? en vs en-US; until not we try to guess
                case 'en':
                    // US vs UK
                    /** @type {?} */
                    var parts = value.split('/');
                    /** @type {?} */
                    var datePartsCount = 3;
                    if (parts.length !== datePartsCount) {
                        return null;
                    }
                    /** @type {?} */
                    var firstPart = parts[0].trim();
                    /** @type {?} */
                    var secondPart = parts[1].trim();
                    if (!this.isNumeric(firstPart) || !this.isNumeric(secondPart)) {
                        return null;
                    }
                    /** @type {?} */
                    var monthsInYears = 12;
                    /** @type {?} */
                    var canFirstBeMonth = +firstPart <= monthsInYears;
                    /** @type {?} */
                    var canSecondByMonth = +secondPart <= monthsInYears;
                    // first two parts cannot be month
                    if (!canFirstBeMonth && !canSecondByMonth) {
                        return null;
                    }
                    /** @type {?} */
                    var canDetermineWhereMonth = canFirstBeMonth && canSecondByMonth;
                    if (canDetermineWhereMonth) {
                        // use US format by default
                        return this.createMoment(value, 'MM/DD/YYYY', this.locale);
                    }
                    return canFirstBeMonth && !canSecondByMonth
                        ? this.createMoment(value, 'MM/DD/YYYY', this.locale)
                        : this.createMoment(value, 'DD/MM/YYYY', this.locale);
                default:
                    throw new Error("Locale " + this.locale + " is not supported");
            }
        };
        /**
         * @private
         * @param {?} value
         * @return {?}
         */
        MomentDateAdapter.prototype.parseWithDash = /**
         * @private
         * @param {?} value
         * @return {?}
         */
        function (value) {
            // leading year vs finishing year
            /** @type {?} */
            var parts = value.split('-');
            if (parts[0].length === 0) {
                return null;
            }
            /** @type {?} */
            var maxDayOrMonthCharsCount = 2;
            return parts[0].length <= maxDayOrMonthCharsCount
                ? this.createMoment(value, 'DD-MM-YYYY', this.locale)
                : this.createMoment(value, 'YYYY-MM-DD', this.locale);
        };
        /**
         * @private
         * @param {?} value
         * @return {?}
         */
        MomentDateAdapter.prototype.parseWithDot = /**
         * @private
         * @param {?} value
         * @return {?}
         */
        function (value) {
            // covers two cases YYYY and YY (for current year)
            return this.createMoment(value, 'DD.MM.YYYY', this.locale);
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
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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

    exports.MC_MOMENT_DATE_ADAPTER_OPTIONS = MC_MOMENT_DATE_ADAPTER_OPTIONS;
    exports.MC_MOMENT_DATE_ADAPTER_OPTIONS_FACTORY = MC_MOMENT_DATE_ADAPTER_OPTIONS_FACTORY;
    exports.MC_MOMENT_DATE_FORMATS = MC_MOMENT_DATE_FORMATS;
    exports.McMomentDateModule = McMomentDateModule;
    exports.MomentDateAdapter = MomentDateAdapter;
    exports.MomentDateModule = MomentDateModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=mosaic-moment-adapter.umd.js.map
