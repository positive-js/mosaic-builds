const SECONDS_TEMPLATE = `{
    SHOW_MILLISECONDS,
    select,
        yes{:{SECONDS}{MILLISECONDS}}
        other{{
            SHOW_SECONDS,
            select,
                yes{:{SECONDS}}
                other{}
        }}
}`;
export const ruRU = {
    relativeTemplates: {
        short: {
            BEFORE_YESTERDAY: `{CURRENT_YEAR, select, yes{{SHORT_DATE}, {TIME}} other{{SHORT_DATE} {YEAR}}}${SECONDS_TEMPLATE}`,
            YESTERDAY: `Вчера, {TIME}${SECONDS_TEMPLATE}`,
            TODAY: `Сегодня, {TIME}${SECONDS_TEMPLATE}`,
            TOMORROW: `Завтра, {TIME}${SECONDS_TEMPLATE}`,
            AFTER_TOMORROW: `{CURRENT_YEAR, select, yes{{SHORT_DATE}, {TIME}} other{{SHORT_DATE} {YEAR}}}${SECONDS_TEMPLATE}`
        },
        long: {
            BEFORE_YESTERDAY: `{CURRENT_YEAR, select, yes{{DATE}, {TIME}} other{{DATE} {YEAR}}}${SECONDS_TEMPLATE}`,
            YESTERDAY: `Вчера, {TIME}${SECONDS_TEMPLATE}`,
            TODAY: `Сегодня, {TIME}${SECONDS_TEMPLATE}`,
            TOMORROW: `Завтра, {TIME}${SECONDS_TEMPLATE}`,
            AFTER_TOMORROW: `{CURRENT_YEAR, select, yes{{DATE}, {TIME}} other{{DATE} {YEAR}}}${SECONDS_TEMPLATE}`
        }
    },
    absoluteTemplates: {
        short: {
            DATE: '{CURRENT_YEAR, select, yes{{SHORT_DATE}} other{{SHORT_DATE} {YEAR}}}',
            DATETIME: `{
                CURRENT_YEAR,
                select,
                    yes{{SHORT_DATE}, {TIME}}
                    other{{SHORT_DATE} {YEAR}, {TIME}}
            }${SECONDS_TEMPLATE}`
        },
        long: {
            DATE: '{CURRENT_YEAR, select, yes{{DATE}} other{{DATE} {YEAR}}}',
            DATETIME: `{
                CURRENT_YEAR,
                select,
                    yes{{DATE}, {TIME}}
                    other{{DATE} {YEAR}, {TIME}}
            }${SECONDS_TEMPLATE}`
        }
    },
    rangeTemplates: {
        closedRange: {
            short: {
                START_DATE: `{
                    SAME_MONTH,
                    select,
                        yes{{DAY}}
                        other{{
                            CURRENT_YEAR,
                            select,
                                yes{{SHORT_DATE}}
                                other{{SHORT_DATE} {YEAR}}
                        }}
                }`,
                END_DATE: '{CURRENT_YEAR, select, yes{{SHORT_DATE}} other{{SHORT_DATE} {YEAR}}}',
                DATE: `{
                    SAME_MONTH,
                    select,
                        yes{{START_DATE}{DASH}{END_DATE}}
                        other{{START_DATE}{LONG_DASH}{END_DATE}}
                }`,
                START_DATETIME: `{
                    SAME_DAY,
                    select,
                        yes{{TIME}}
                        other{{
                            CURRENT_YEAR,
                            select,
                                yes{{SHORT_DATE}, {TIME}}
                                other{{SHORT_DATE} {YEAR}, {TIME}}
                        }}
                }${SECONDS_TEMPLATE}`,
                END_DATETIME: `{
                    SAME_DAY,
                    select,
                        yes{{
                            CURRENT_YEAR,
                            select,
                                yes{{TIME}${SECONDS_TEMPLATE}, {SHORT_DATE}}
                                other{{TIME}${SECONDS_TEMPLATE}, {SHORT_DATE} {YEAR}}
                        }}
                        other{{
                            CURRENT_YEAR,
                            select,
                                yes{{SHORT_DATE}, {TIME}}
                                other{{SHORT_DATE} {YEAR}, {TIME}}
                        }${SECONDS_TEMPLATE}}
                }`,
                DATETIME: `{
                    SAME_DAY,
                    select,
                        yes{{START_DATETIME}{DASH}{END_DATETIME}}
                        other{{START_DATETIME}{LONG_DASH}{END_DATETIME}}
                }`
            },
            middle: {
                START_DATE: `{
                    SAME_MONTH,
                    select,
                        yes{{DAY}}
                        other{{
                            CURRENT_YEAR,
                            select,
                                yes{{DATE}}
                                other{{DATE} {YEAR}}
                        }}
                }`,
                END_DATE: '{CURRENT_YEAR, select, yes{{DATE}} other{{DATE} {YEAR}}}',
                DATE: `{
                    SAME_MONTH,
                    select,
                        yes{{START_DATE}{DASH}{END_DATE}}
                        other{{START_DATE}{LONG_DASH}{END_DATE}}
                }`,
                START_DATETIME: `{
                    SAME_DAY,
                    select,
                        yes{{TIME}}
                        other{{
                            CURRENT_YEAR,
                            select,
                                yes{{DATE}, {TIME}}
                                other{{DATE} {YEAR}, {TIME}}
                        }}
                }${SECONDS_TEMPLATE}`,
                END_DATETIME: `{
                    SAME_DAY,
                    select,
                        yes{{
                            CURRENT_YEAR,
                            select,
                                yes{{TIME}${SECONDS_TEMPLATE}, {DATE}}
                                other{{TIME}${SECONDS_TEMPLATE}, {DATE} {YEAR}}
                        }}
                        other{{
                            CURRENT_YEAR,
                            select,
                                yes{{DATE}, {TIME}}
                                other{{DATE} {YEAR}, {TIME}}
                        }${SECONDS_TEMPLATE}}
                }`,
                DATETIME: `{
                    SAME_DAY,
                    select,
                        yes{{START_DATETIME}{DASH}{END_DATETIME}}
                        other{{START_DATETIME}{LONG_DASH}{END_DATETIME}}
                }`
            },
            long: {
                START_DATE: `{
                    SAME_MONTH,
                    select,
                        yes{{DAY}}
                        other{{
                            CURRENT_YEAR,
                            select,
                                yes{{DATE}}
                                other{{DATE} {YEAR}}
                        }}
                }`,
                END_DATE: '{CURRENT_YEAR, select, yes{{DATE}} other{{DATE} {YEAR}}}',
                DATE: `{
                    SAME_MONTH,
                    select,
                        yes{{START_DATE}{DASH}{END_DATE}}
                        other{{START_DATE}{LONG_DASH}{END_DATE}}
                }`,
                START_DATETIME: `{
                    SAME_DAY,
                    select,
                        yes{{
                            CURRENT_YEAR,
                            select,
                                yes{{DATE}, с{NBSP}{TIME}}
                                other{{DATE} {YEAR}, с{NBSP}{TIME}}
                        }}
                        other{{
                            CURRENT_YEAR,
                            select,
                                yes{{DATE}, {TIME}}
                                other{{DATE} {YEAR}, {TIME}}
                        }}
                }${SECONDS_TEMPLATE}`,
                END_DATETIME: `{
                    SAME_DAY,
                    select,
                        yes{по{NBSP}{TIME}}
                        other{{
                            CURRENT_YEAR,
                            select,
                                yes{{DATE}, {TIME}}
                                other{{DATE} {YEAR}, {TIME}}
                        }}
                }${SECONDS_TEMPLATE}`,
                DATETIME: `{
                    SAME_DAY,
                    select,
                        yes{{START_DATETIME} {END_DATETIME}}
                        other{С{NBSP}{START_DATETIME} по{NBSP}{END_DATETIME}}
                }`
            }
        },
        openedRange: {
            short: {
                START_DATE: `{
                    CURRENT_YEAR,
                    select,
                        yes{{SHORT_DATE}}
                        other{{SHORT_DATE} {YEAR}}
                }`,
                END_DATE: '{CURRENT_YEAR, select, yes{{SHORT_DATE}} other{{SHORT_DATE} {YEAR}}}',
                DATE: `{
                    RANGE_TYPE,
                    select,
                        onlyStart{С{NBSP}{START_DATE}}
                        other{По{NBSP}{END_DATE}}
                }`,
                START_DATETIME: `{
                    CURRENT_YEAR,
                    select,
                        yes{{SHORT_DATE}, {TIME}}
                        other{{SHORT_DATE} {YEAR}, {TIME}}
                }${SECONDS_TEMPLATE}`,
                END_DATETIME: `{
                    CURRENT_YEAR,
                    select,
                        yes{{SHORT_DATE}, {TIME}}
                        other{{SHORT_DATE} {YEAR}, {TIME}}
                }${SECONDS_TEMPLATE}`,
                DATETIME: `{
                    RANGE_TYPE,
                    select,
                        onlyStart{С{NBSP}{START_DATETIME}}
                        other{По{NBSP}{END_DATETIME}}
                }`
            },
            long: {
                START_DATE: `{
                    CURRENT_YEAR,
                    select,
                        yes{{DATE}}
                        other{{DATE} {YEAR}}
                }`,
                END_DATE: '{CURRENT_YEAR, select, yes{{DATE}} other{{DATE} {YEAR}}}',
                DATE: `{
                    RANGE_TYPE,
                    select,
                        onlyStart{С{NBSP}{START_DATE}}
                        other{По{NBSP}{END_DATE}}
                }`,
                START_DATETIME: `{
                    CURRENT_YEAR,
                    select,
                        yes{{DATE}, {TIME}}
                        other{{DATE} {YEAR}, {TIME}}
                }${SECONDS_TEMPLATE}`,
                END_DATETIME: `{
                    CURRENT_YEAR,
                    select,
                        yes{{DATE}, {TIME}}
                        other{{DATE} {YEAR}, {TIME}}
                }${SECONDS_TEMPLATE}`,
                DATETIME: `{
                    RANGE_TYPE,
                    select,
                        onlyStart{С{NBSP}{START_DATETIME}}
                        other{По{NBSP}{END_DATETIME}}
                }`
            }
        }
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicnUtUlUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9tb3NhaWMvY29yZS9mb3JtYXR0ZXJzL2RhdGUvdGVtcGxhdGVzL3J1LVJVLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sZ0JBQWdCLEdBQUc7Ozs7Ozs7Ozs7RUFVdkIsQ0FBQztBQUVILE1BQU0sQ0FBQyxNQUFNLElBQUksR0FBRztJQUNoQixpQkFBaUIsRUFBRTtRQUNmLEtBQUssRUFBRTtZQUNILGdCQUFnQixFQUFFLCtFQUErRSxnQkFBZ0IsRUFBRTtZQUNuSCxTQUFTLEVBQUUsZ0JBQWdCLGdCQUFnQixFQUFFO1lBQzdDLEtBQUssRUFBRSxrQkFBa0IsZ0JBQWdCLEVBQUU7WUFDM0MsUUFBUSxFQUFFLGlCQUFpQixnQkFBZ0IsRUFBRTtZQUM3QyxjQUFjLEVBQUUsK0VBQStFLGdCQUFnQixFQUFFO1NBQ3BIO1FBQ0QsSUFBSSxFQUFFO1lBQ0YsZ0JBQWdCLEVBQUUsbUVBQW1FLGdCQUFnQixFQUFFO1lBQ3ZHLFNBQVMsRUFBRSxnQkFBZ0IsZ0JBQWdCLEVBQUU7WUFDN0MsS0FBSyxFQUFFLGtCQUFrQixnQkFBZ0IsRUFBRTtZQUMzQyxRQUFRLEVBQUUsaUJBQWlCLGdCQUFnQixFQUFFO1lBQzdDLGNBQWMsRUFBRSxtRUFBbUUsZ0JBQWdCLEVBQUU7U0FDeEc7S0FDSjtJQUNELGlCQUFpQixFQUFFO1FBQ2YsS0FBSyxFQUFFO1lBQ0gsSUFBSSxFQUFFLHNFQUFzRTtZQUM1RSxRQUFRLEVBQUU7Ozs7O2VBS1AsZ0JBQWdCLEVBQUU7U0FDeEI7UUFDRCxJQUFJLEVBQUU7WUFDRixJQUFJLEVBQUUsMERBQTBEO1lBQ2hFLFFBQVEsRUFBRTs7Ozs7ZUFLUCxnQkFBZ0IsRUFBRTtTQUN4QjtLQUNKO0lBQ0QsY0FBYyxFQUFFO1FBQ1osV0FBVyxFQUFFO1lBQ1QsS0FBSyxFQUFFO2dCQUNILFVBQVUsRUFBRTs7Ozs7Ozs7OztrQkFVVjtnQkFDRixRQUFRLEVBQUUsc0VBQXNFO2dCQUNoRixJQUFJLEVBQUU7Ozs7O2tCQUtKO2dCQUVGLGNBQWMsRUFBRTs7Ozs7Ozs7OzttQkFVYixnQkFBZ0IsRUFBRTtnQkFDckIsWUFBWSxFQUFFOzs7Ozs7NENBTWMsZ0JBQWdCOzhDQUNkLGdCQUFnQjs7Ozs7OzsyQkFPbkMsZ0JBQWdCO2tCQUN6QjtnQkFDRixRQUFRLEVBQUU7Ozs7O2tCQUtSO2FBQ0w7WUFDRCxNQUFNLEVBQUU7Z0JBQ0osVUFBVSxFQUFFOzs7Ozs7Ozs7O2tCQVVWO2dCQUNGLFFBQVEsRUFBRSwwREFBMEQ7Z0JBQ3BFLElBQUksRUFBRTs7Ozs7a0JBS0o7Z0JBRUYsY0FBYyxFQUFFOzs7Ozs7Ozs7O21CQVViLGdCQUFnQixFQUFFO2dCQUNyQixZQUFZLEVBQUU7Ozs7Ozs0Q0FNYyxnQkFBZ0I7OENBQ2QsZ0JBQWdCOzs7Ozs7OzJCQU9uQyxnQkFBZ0I7a0JBQ3pCO2dCQUNGLFFBQVEsRUFBRTs7Ozs7a0JBS1I7YUFDTDtZQUNELElBQUksRUFBRTtnQkFDRixVQUFVLEVBQUU7Ozs7Ozs7Ozs7a0JBVVY7Z0JBQ0YsUUFBUSxFQUFFLDBEQUEwRDtnQkFDcEUsSUFBSSxFQUFFOzs7OztrQkFLSjtnQkFFRixjQUFjLEVBQUU7Ozs7Ozs7Ozs7Ozs7OzttQkFlYixnQkFBZ0IsRUFBRTtnQkFDckIsWUFBWSxFQUFFOzs7Ozs7Ozs7O21CQVVYLGdCQUFnQixFQUFFO2dCQUNyQixRQUFRLEVBQUU7Ozs7O2tCQUtSO2FBQ0w7U0FDSjtRQUNELFdBQVcsRUFBRTtZQUNULEtBQUssRUFBRTtnQkFDSCxVQUFVLEVBQUU7Ozs7O2tCQUtWO2dCQUNGLFFBQVEsRUFBRSxzRUFBc0U7Z0JBQ2hGLElBQUksRUFBRTs7Ozs7a0JBS0o7Z0JBRUYsY0FBYyxFQUFFOzs7OzttQkFLYixnQkFBZ0IsRUFBRTtnQkFDckIsWUFBWSxFQUFFOzs7OzttQkFLWCxnQkFBZ0IsRUFBRTtnQkFDckIsUUFBUSxFQUFFOzs7OztrQkFLUjthQUNMO1lBQ0QsSUFBSSxFQUFFO2dCQUNGLFVBQVUsRUFBRTs7Ozs7a0JBS1Y7Z0JBQ0YsUUFBUSxFQUFFLDBEQUEwRDtnQkFDcEUsSUFBSSxFQUFFOzs7OztrQkFLSjtnQkFFRixjQUFjLEVBQUU7Ozs7O21CQUtiLGdCQUFnQixFQUFFO2dCQUNyQixZQUFZLEVBQUU7Ozs7O21CQUtYLGdCQUFnQixFQUFFO2dCQUNyQixRQUFRLEVBQUU7Ozs7O2tCQUtSO2FBQ0w7U0FDSjtLQUNKO0NBQ0osQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IFNFQ09ORFNfVEVNUExBVEUgPSBge1xuICAgIFNIT1dfTUlMTElTRUNPTkRTLFxuICAgIHNlbGVjdCxcbiAgICAgICAgeWVzezp7U0VDT05EU317TUlMTElTRUNPTkRTfX1cbiAgICAgICAgb3RoZXJ7e1xuICAgICAgICAgICAgU0hPV19TRUNPTkRTLFxuICAgICAgICAgICAgc2VsZWN0LFxuICAgICAgICAgICAgICAgIHllc3s6e1NFQ09ORFN9fVxuICAgICAgICAgICAgICAgIG90aGVye31cbiAgICAgICAgfX1cbn1gO1xuXG5leHBvcnQgY29uc3QgcnVSVSA9IHtcbiAgICByZWxhdGl2ZVRlbXBsYXRlczoge1xuICAgICAgICBzaG9ydDoge1xuICAgICAgICAgICAgQkVGT1JFX1lFU1RFUkRBWTogYHtDVVJSRU5UX1lFQVIsIHNlbGVjdCwgeWVze3tTSE9SVF9EQVRFfSwge1RJTUV9fSBvdGhlcnt7U0hPUlRfREFURX0ge1lFQVJ9fX0ke1NFQ09ORFNfVEVNUExBVEV9YCxcbiAgICAgICAgICAgIFlFU1RFUkRBWTogYNCS0YfQtdGA0LAsIHtUSU1FfSR7U0VDT05EU19URU1QTEFURX1gLFxuICAgICAgICAgICAgVE9EQVk6IGDQodC10LPQvtC00L3Rjywge1RJTUV9JHtTRUNPTkRTX1RFTVBMQVRFfWAsXG4gICAgICAgICAgICBUT01PUlJPVzogYNCX0LDQstGC0YDQsCwge1RJTUV9JHtTRUNPTkRTX1RFTVBMQVRFfWAsXG4gICAgICAgICAgICBBRlRFUl9UT01PUlJPVzogYHtDVVJSRU5UX1lFQVIsIHNlbGVjdCwgeWVze3tTSE9SVF9EQVRFfSwge1RJTUV9fSBvdGhlcnt7U0hPUlRfREFURX0ge1lFQVJ9fX0ke1NFQ09ORFNfVEVNUExBVEV9YFxuICAgICAgICB9LFxuICAgICAgICBsb25nOiB7XG4gICAgICAgICAgICBCRUZPUkVfWUVTVEVSREFZOiBge0NVUlJFTlRfWUVBUiwgc2VsZWN0LCB5ZXN7e0RBVEV9LCB7VElNRX19IG90aGVye3tEQVRFfSB7WUVBUn19fSR7U0VDT05EU19URU1QTEFURX1gLFxuICAgICAgICAgICAgWUVTVEVSREFZOiBg0JLRh9C10YDQsCwge1RJTUV9JHtTRUNPTkRTX1RFTVBMQVRFfWAsXG4gICAgICAgICAgICBUT0RBWTogYNCh0LXQs9C+0LTQvdGPLCB7VElNRX0ke1NFQ09ORFNfVEVNUExBVEV9YCxcbiAgICAgICAgICAgIFRPTU9SUk9XOiBg0JfQsNCy0YLRgNCwLCB7VElNRX0ke1NFQ09ORFNfVEVNUExBVEV9YCxcbiAgICAgICAgICAgIEFGVEVSX1RPTU9SUk9XOiBge0NVUlJFTlRfWUVBUiwgc2VsZWN0LCB5ZXN7e0RBVEV9LCB7VElNRX19IG90aGVye3tEQVRFfSB7WUVBUn19fSR7U0VDT05EU19URU1QTEFURX1gXG4gICAgICAgIH1cbiAgICB9LFxuICAgIGFic29sdXRlVGVtcGxhdGVzOiB7XG4gICAgICAgIHNob3J0OiB7XG4gICAgICAgICAgICBEQVRFOiAne0NVUlJFTlRfWUVBUiwgc2VsZWN0LCB5ZXN7e1NIT1JUX0RBVEV9fSBvdGhlcnt7U0hPUlRfREFURX0ge1lFQVJ9fX0nLFxuICAgICAgICAgICAgREFURVRJTUU6IGB7XG4gICAgICAgICAgICAgICAgQ1VSUkVOVF9ZRUFSLFxuICAgICAgICAgICAgICAgIHNlbGVjdCxcbiAgICAgICAgICAgICAgICAgICAgeWVze3tTSE9SVF9EQVRFfSwge1RJTUV9fVxuICAgICAgICAgICAgICAgICAgICBvdGhlcnt7U0hPUlRfREFURX0ge1lFQVJ9LCB7VElNRX19XG4gICAgICAgICAgICB9JHtTRUNPTkRTX1RFTVBMQVRFfWBcbiAgICAgICAgfSxcbiAgICAgICAgbG9uZzoge1xuICAgICAgICAgICAgREFURTogJ3tDVVJSRU5UX1lFQVIsIHNlbGVjdCwgeWVze3tEQVRFfX0gb3RoZXJ7e0RBVEV9IHtZRUFSfX19JyxcbiAgICAgICAgICAgIERBVEVUSU1FOiBge1xuICAgICAgICAgICAgICAgIENVUlJFTlRfWUVBUixcbiAgICAgICAgICAgICAgICBzZWxlY3QsXG4gICAgICAgICAgICAgICAgICAgIHllc3t7REFURX0sIHtUSU1FfX1cbiAgICAgICAgICAgICAgICAgICAgb3RoZXJ7e0RBVEV9IHtZRUFSfSwge1RJTUV9fVxuICAgICAgICAgICAgfSR7U0VDT05EU19URU1QTEFURX1gXG4gICAgICAgIH1cbiAgICB9LFxuICAgIHJhbmdlVGVtcGxhdGVzOiB7XG4gICAgICAgIGNsb3NlZFJhbmdlOiB7XG4gICAgICAgICAgICBzaG9ydDoge1xuICAgICAgICAgICAgICAgIFNUQVJUX0RBVEU6IGB7XG4gICAgICAgICAgICAgICAgICAgIFNBTUVfTU9OVEgsXG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHllc3t7REFZfX1cbiAgICAgICAgICAgICAgICAgICAgICAgIG90aGVye3tcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBDVVJSRU5UX1lFQVIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB5ZXN7e1NIT1JUX0RBVEV9fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvdGhlcnt7U0hPUlRfREFURX0ge1lFQVJ9fVxuICAgICAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICB9YCxcbiAgICAgICAgICAgICAgICBFTkRfREFURTogJ3tDVVJSRU5UX1lFQVIsIHNlbGVjdCwgeWVze3tTSE9SVF9EQVRFfX0gb3RoZXJ7e1NIT1JUX0RBVEV9IHtZRUFSfX19JyxcbiAgICAgICAgICAgICAgICBEQVRFOiBge1xuICAgICAgICAgICAgICAgICAgICBTQU1FX01PTlRILFxuICAgICAgICAgICAgICAgICAgICBzZWxlY3QsXG4gICAgICAgICAgICAgICAgICAgICAgICB5ZXN7e1NUQVJUX0RBVEV9e0RBU0h9e0VORF9EQVRFfX1cbiAgICAgICAgICAgICAgICAgICAgICAgIG90aGVye3tTVEFSVF9EQVRFfXtMT05HX0RBU0h9e0VORF9EQVRFfX1cbiAgICAgICAgICAgICAgICB9YCxcblxuICAgICAgICAgICAgICAgIFNUQVJUX0RBVEVUSU1FOiBge1xuICAgICAgICAgICAgICAgICAgICBTQU1FX0RBWSxcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0LFxuICAgICAgICAgICAgICAgICAgICAgICAgeWVze3tUSU1FfX1cbiAgICAgICAgICAgICAgICAgICAgICAgIG90aGVye3tcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBDVVJSRU5UX1lFQVIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB5ZXN7e1NIT1JUX0RBVEV9LCB7VElNRX19XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG90aGVye3tTSE9SVF9EQVRFfSB7WUVBUn0sIHtUSU1FfX1cbiAgICAgICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgfSR7U0VDT05EU19URU1QTEFURX1gLFxuICAgICAgICAgICAgICAgIEVORF9EQVRFVElNRTogYHtcbiAgICAgICAgICAgICAgICAgICAgU0FNRV9EQVksXG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHllc3t7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgQ1VSUkVOVF9ZRUFSLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeWVze3tUSU1FfSR7U0VDT05EU19URU1QTEFURX0sIHtTSE9SVF9EQVRFfX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb3RoZXJ7e1RJTUV9JHtTRUNPTkRTX1RFTVBMQVRFfSwge1NIT1JUX0RBVEV9IHtZRUFSfX1cbiAgICAgICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAgICAgICBvdGhlcnt7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgQ1VSUkVOVF9ZRUFSLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeWVze3tTSE9SVF9EQVRFfSwge1RJTUV9fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvdGhlcnt7U0hPUlRfREFURX0ge1lFQVJ9LCB7VElNRX19XG4gICAgICAgICAgICAgICAgICAgICAgICB9JHtTRUNPTkRTX1RFTVBMQVRFfX1cbiAgICAgICAgICAgICAgICB9YCxcbiAgICAgICAgICAgICAgICBEQVRFVElNRTogYHtcbiAgICAgICAgICAgICAgICAgICAgU0FNRV9EQVksXG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHllc3t7U1RBUlRfREFURVRJTUV9e0RBU0h9e0VORF9EQVRFVElNRX19XG4gICAgICAgICAgICAgICAgICAgICAgICBvdGhlcnt7U1RBUlRfREFURVRJTUV9e0xPTkdfREFTSH17RU5EX0RBVEVUSU1FfX1cbiAgICAgICAgICAgICAgICB9YFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG1pZGRsZToge1xuICAgICAgICAgICAgICAgIFNUQVJUX0RBVEU6IGB7XG4gICAgICAgICAgICAgICAgICAgIFNBTUVfTU9OVEgsXG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHllc3t7REFZfX1cbiAgICAgICAgICAgICAgICAgICAgICAgIG90aGVye3tcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBDVVJSRU5UX1lFQVIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB5ZXN7e0RBVEV9fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvdGhlcnt7REFURX0ge1lFQVJ9fVxuICAgICAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICB9YCxcbiAgICAgICAgICAgICAgICBFTkRfREFURTogJ3tDVVJSRU5UX1lFQVIsIHNlbGVjdCwgeWVze3tEQVRFfX0gb3RoZXJ7e0RBVEV9IHtZRUFSfX19JyxcbiAgICAgICAgICAgICAgICBEQVRFOiBge1xuICAgICAgICAgICAgICAgICAgICBTQU1FX01PTlRILFxuICAgICAgICAgICAgICAgICAgICBzZWxlY3QsXG4gICAgICAgICAgICAgICAgICAgICAgICB5ZXN7e1NUQVJUX0RBVEV9e0RBU0h9e0VORF9EQVRFfX1cbiAgICAgICAgICAgICAgICAgICAgICAgIG90aGVye3tTVEFSVF9EQVRFfXtMT05HX0RBU0h9e0VORF9EQVRFfX1cbiAgICAgICAgICAgICAgICB9YCxcblxuICAgICAgICAgICAgICAgIFNUQVJUX0RBVEVUSU1FOiBge1xuICAgICAgICAgICAgICAgICAgICBTQU1FX0RBWSxcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0LFxuICAgICAgICAgICAgICAgICAgICAgICAgeWVze3tUSU1FfX1cbiAgICAgICAgICAgICAgICAgICAgICAgIG90aGVye3tcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBDVVJSRU5UX1lFQVIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB5ZXN7e0RBVEV9LCB7VElNRX19XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG90aGVye3tEQVRFfSB7WUVBUn0sIHtUSU1FfX1cbiAgICAgICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgfSR7U0VDT05EU19URU1QTEFURX1gLFxuICAgICAgICAgICAgICAgIEVORF9EQVRFVElNRTogYHtcbiAgICAgICAgICAgICAgICAgICAgU0FNRV9EQVksXG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHllc3t7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgQ1VSUkVOVF9ZRUFSLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeWVze3tUSU1FfSR7U0VDT05EU19URU1QTEFURX0sIHtEQVRFfX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb3RoZXJ7e1RJTUV9JHtTRUNPTkRTX1RFTVBMQVRFfSwge0RBVEV9IHtZRUFSfX1cbiAgICAgICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAgICAgICBvdGhlcnt7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgQ1VSUkVOVF9ZRUFSLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeWVze3tEQVRFfSwge1RJTUV9fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvdGhlcnt7REFURX0ge1lFQVJ9LCB7VElNRX19XG4gICAgICAgICAgICAgICAgICAgICAgICB9JHtTRUNPTkRTX1RFTVBMQVRFfX1cbiAgICAgICAgICAgICAgICB9YCxcbiAgICAgICAgICAgICAgICBEQVRFVElNRTogYHtcbiAgICAgICAgICAgICAgICAgICAgU0FNRV9EQVksXG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHllc3t7U1RBUlRfREFURVRJTUV9e0RBU0h9e0VORF9EQVRFVElNRX19XG4gICAgICAgICAgICAgICAgICAgICAgICBvdGhlcnt7U1RBUlRfREFURVRJTUV9e0xPTkdfREFTSH17RU5EX0RBVEVUSU1FfX1cbiAgICAgICAgICAgICAgICB9YFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGxvbmc6IHtcbiAgICAgICAgICAgICAgICBTVEFSVF9EQVRFOiBge1xuICAgICAgICAgICAgICAgICAgICBTQU1FX01PTlRILFxuICAgICAgICAgICAgICAgICAgICBzZWxlY3QsXG4gICAgICAgICAgICAgICAgICAgICAgICB5ZXN7e0RBWX19XG4gICAgICAgICAgICAgICAgICAgICAgICBvdGhlcnt7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgQ1VSUkVOVF9ZRUFSLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeWVze3tEQVRFfX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb3RoZXJ7e0RBVEV9IHtZRUFSfX1cbiAgICAgICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgfWAsXG4gICAgICAgICAgICAgICAgRU5EX0RBVEU6ICd7Q1VSUkVOVF9ZRUFSLCBzZWxlY3QsIHllc3t7REFURX19IG90aGVye3tEQVRFfSB7WUVBUn19fScsXG4gICAgICAgICAgICAgICAgREFURTogYHtcbiAgICAgICAgICAgICAgICAgICAgU0FNRV9NT05USCxcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0LFxuICAgICAgICAgICAgICAgICAgICAgICAgeWVze3tTVEFSVF9EQVRFfXtEQVNIfXtFTkRfREFURX19XG4gICAgICAgICAgICAgICAgICAgICAgICBvdGhlcnt7U1RBUlRfREFURX17TE9OR19EQVNIfXtFTkRfREFURX19XG4gICAgICAgICAgICAgICAgfWAsXG5cbiAgICAgICAgICAgICAgICBTVEFSVF9EQVRFVElNRTogYHtcbiAgICAgICAgICAgICAgICAgICAgU0FNRV9EQVksXG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHllc3t7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgQ1VSUkVOVF9ZRUFSLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeWVze3tEQVRFfSwg0YF7TkJTUH17VElNRX19XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG90aGVye3tEQVRFfSB7WUVBUn0sINGBe05CU1B9e1RJTUV9fVxuICAgICAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgICAgICAgIG90aGVye3tcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBDVVJSRU5UX1lFQVIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB5ZXN7e0RBVEV9LCB7VElNRX19XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG90aGVye3tEQVRFfSB7WUVBUn0sIHtUSU1FfX1cbiAgICAgICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgfSR7U0VDT05EU19URU1QTEFURX1gLFxuICAgICAgICAgICAgICAgIEVORF9EQVRFVElNRTogYHtcbiAgICAgICAgICAgICAgICAgICAgU0FNRV9EQVksXG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHllc3vQv9C+e05CU1B9e1RJTUV9fVxuICAgICAgICAgICAgICAgICAgICAgICAgb3RoZXJ7e1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIENVUlJFTlRfWUVBUixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3QsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHllc3t7REFURX0sIHtUSU1FfX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb3RoZXJ7e0RBVEV9IHtZRUFSfSwge1RJTUV9fVxuICAgICAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICB9JHtTRUNPTkRTX1RFTVBMQVRFfWAsXG4gICAgICAgICAgICAgICAgREFURVRJTUU6IGB7XG4gICAgICAgICAgICAgICAgICAgIFNBTUVfREFZLFxuICAgICAgICAgICAgICAgICAgICBzZWxlY3QsXG4gICAgICAgICAgICAgICAgICAgICAgICB5ZXN7e1NUQVJUX0RBVEVUSU1FfSB7RU5EX0RBVEVUSU1FfX1cbiAgICAgICAgICAgICAgICAgICAgICAgIG90aGVye9Che05CU1B9e1NUQVJUX0RBVEVUSU1FfSDQv9C+e05CU1B9e0VORF9EQVRFVElNRX19XG4gICAgICAgICAgICAgICAgfWBcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgb3BlbmVkUmFuZ2U6IHtcbiAgICAgICAgICAgIHNob3J0OiB7XG4gICAgICAgICAgICAgICAgU1RBUlRfREFURTogYHtcbiAgICAgICAgICAgICAgICAgICAgQ1VSUkVOVF9ZRUFSLFxuICAgICAgICAgICAgICAgICAgICBzZWxlY3QsXG4gICAgICAgICAgICAgICAgICAgICAgICB5ZXN7e1NIT1JUX0RBVEV9fVxuICAgICAgICAgICAgICAgICAgICAgICAgb3RoZXJ7e1NIT1JUX0RBVEV9IHtZRUFSfX1cbiAgICAgICAgICAgICAgICB9YCxcbiAgICAgICAgICAgICAgICBFTkRfREFURTogJ3tDVVJSRU5UX1lFQVIsIHNlbGVjdCwgeWVze3tTSE9SVF9EQVRFfX0gb3RoZXJ7e1NIT1JUX0RBVEV9IHtZRUFSfX19JyxcbiAgICAgICAgICAgICAgICBEQVRFOiBge1xuICAgICAgICAgICAgICAgICAgICBSQU5HRV9UWVBFLFxuICAgICAgICAgICAgICAgICAgICBzZWxlY3QsXG4gICAgICAgICAgICAgICAgICAgICAgICBvbmx5U3RhcnR70KF7TkJTUH17U1RBUlRfREFURX19XG4gICAgICAgICAgICAgICAgICAgICAgICBvdGhlcnvQn9C+e05CU1B9e0VORF9EQVRFfX1cbiAgICAgICAgICAgICAgICB9YCxcblxuICAgICAgICAgICAgICAgIFNUQVJUX0RBVEVUSU1FOiBge1xuICAgICAgICAgICAgICAgICAgICBDVVJSRU5UX1lFQVIsXG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHllc3t7U0hPUlRfREFURX0sIHtUSU1FfX1cbiAgICAgICAgICAgICAgICAgICAgICAgIG90aGVye3tTSE9SVF9EQVRFfSB7WUVBUn0sIHtUSU1FfX1cbiAgICAgICAgICAgICAgICB9JHtTRUNPTkRTX1RFTVBMQVRFfWAsXG4gICAgICAgICAgICAgICAgRU5EX0RBVEVUSU1FOiBge1xuICAgICAgICAgICAgICAgICAgICBDVVJSRU5UX1lFQVIsXG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHllc3t7U0hPUlRfREFURX0sIHtUSU1FfX1cbiAgICAgICAgICAgICAgICAgICAgICAgIG90aGVye3tTSE9SVF9EQVRFfSB7WUVBUn0sIHtUSU1FfX1cbiAgICAgICAgICAgICAgICB9JHtTRUNPTkRTX1RFTVBMQVRFfWAsXG4gICAgICAgICAgICAgICAgREFURVRJTUU6IGB7XG4gICAgICAgICAgICAgICAgICAgIFJBTkdFX1RZUEUsXG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdCxcbiAgICAgICAgICAgICAgICAgICAgICAgIG9ubHlTdGFydHvQoXtOQlNQfXtTVEFSVF9EQVRFVElNRX19XG4gICAgICAgICAgICAgICAgICAgICAgICBvdGhlcnvQn9C+e05CU1B9e0VORF9EQVRFVElNRX19XG4gICAgICAgICAgICAgICAgfWBcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBsb25nOiB7XG4gICAgICAgICAgICAgICAgU1RBUlRfREFURTogYHtcbiAgICAgICAgICAgICAgICAgICAgQ1VSUkVOVF9ZRUFSLFxuICAgICAgICAgICAgICAgICAgICBzZWxlY3QsXG4gICAgICAgICAgICAgICAgICAgICAgICB5ZXN7e0RBVEV9fVxuICAgICAgICAgICAgICAgICAgICAgICAgb3RoZXJ7e0RBVEV9IHtZRUFSfX1cbiAgICAgICAgICAgICAgICB9YCxcbiAgICAgICAgICAgICAgICBFTkRfREFURTogJ3tDVVJSRU5UX1lFQVIsIHNlbGVjdCwgeWVze3tEQVRFfX0gb3RoZXJ7e0RBVEV9IHtZRUFSfX19JyxcbiAgICAgICAgICAgICAgICBEQVRFOiBge1xuICAgICAgICAgICAgICAgICAgICBSQU5HRV9UWVBFLFxuICAgICAgICAgICAgICAgICAgICBzZWxlY3QsXG4gICAgICAgICAgICAgICAgICAgICAgICBvbmx5U3RhcnR70KF7TkJTUH17U1RBUlRfREFURX19XG4gICAgICAgICAgICAgICAgICAgICAgICBvdGhlcnvQn9C+e05CU1B9e0VORF9EQVRFfX1cbiAgICAgICAgICAgICAgICB9YCxcblxuICAgICAgICAgICAgICAgIFNUQVJUX0RBVEVUSU1FOiBge1xuICAgICAgICAgICAgICAgICAgICBDVVJSRU5UX1lFQVIsXG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHllc3t7REFURX0sIHtUSU1FfX1cbiAgICAgICAgICAgICAgICAgICAgICAgIG90aGVye3tEQVRFfSB7WUVBUn0sIHtUSU1FfX1cbiAgICAgICAgICAgICAgICB9JHtTRUNPTkRTX1RFTVBMQVRFfWAsXG4gICAgICAgICAgICAgICAgRU5EX0RBVEVUSU1FOiBge1xuICAgICAgICAgICAgICAgICAgICBDVVJSRU5UX1lFQVIsXG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHllc3t7REFURX0sIHtUSU1FfX1cbiAgICAgICAgICAgICAgICAgICAgICAgIG90aGVye3tEQVRFfSB7WUVBUn0sIHtUSU1FfX1cbiAgICAgICAgICAgICAgICB9JHtTRUNPTkRTX1RFTVBMQVRFfWAsXG4gICAgICAgICAgICAgICAgREFURVRJTUU6IGB7XG4gICAgICAgICAgICAgICAgICAgIFJBTkdFX1RZUEUsXG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdCxcbiAgICAgICAgICAgICAgICAgICAgICAgIG9ubHlTdGFydHvQoXtOQlNQfXtTVEFSVF9EQVRFVElNRX19XG4gICAgICAgICAgICAgICAgICAgICAgICBvdGhlcnvQn9C+e05CU1B9e0VORF9EQVRFVElNRX19XG4gICAgICAgICAgICAgICAgfWBcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn07XG4iXX0=