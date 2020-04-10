/**
 * @fileoverview added by tsickle
 * Generated from: datepicker-module.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { A11yModule } from '@angular/cdk/a11y';
import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { McButtonModule } from '@ptsecurity/mosaic/button';
import { McIconModule } from '@ptsecurity/mosaic/icon';
import { McCalendar, McCalendarHeader } from './calendar';
import { McCalendarBody } from './calendar-body';
import { McDatepicker, McDatepickerContent, MC_DATEPICKER_SCROLL_STRATEGY_FACTORY_PROVIDER } from './datepicker';
import { McDatepickerInput } from './datepicker-input';
import { McDatepickerIntl } from './datepicker-intl';
import { McDatepickerToggle, McDatepickerToggleIcon } from './datepicker-toggle';
import { McMonthView } from './month-view';
import { McMultiYearView } from './multi-year-view';
import { McYearView } from './year-view';
export class McDatepickerModule {
}
McDatepickerModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    McButtonModule,
                    OverlayModule,
                    A11yModule,
                    PortalModule,
                    McIconModule
                ],
                exports: [
                    McCalendar,
                    McCalendarBody,
                    McDatepicker,
                    McDatepickerContent,
                    McDatepickerInput,
                    McDatepickerToggle,
                    McDatepickerToggleIcon,
                    McMonthView,
                    McYearView,
                    McMultiYearView,
                    McCalendarHeader,
                    McButtonModule
                ],
                declarations: [
                    McCalendar,
                    McCalendarBody,
                    McDatepicker,
                    McDatepickerContent,
                    McDatepickerInput,
                    McDatepickerToggle,
                    McDatepickerToggleIcon,
                    McMonthView,
                    McYearView,
                    McMultiYearView,
                    McCalendarHeader
                ],
                providers: [
                    McDatepickerIntl,
                    MC_DATEPICKER_SCROLL_STRATEGY_FACTORY_PROVIDER
                ],
                entryComponents: [
                    McDatepickerContent,
                    McCalendarHeader
                ]
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZXBpY2tlci1tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AcHRzZWN1cml0eS9tb3NhaWMvZGF0ZXBpY2tlci8iLCJzb3VyY2VzIjpbImRhdGVwaWNrZXItbW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUNyRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDbkQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQzNELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUV2RCxPQUFPLEVBQUUsVUFBVSxFQUFFLGdCQUFnQixFQUFFLE1BQU0sWUFBWSxDQUFDO0FBQzFELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUNqRCxPQUFPLEVBQ0gsWUFBWSxFQUNaLG1CQUFtQixFQUNuQiw4Q0FBOEMsRUFDakQsTUFBTSxjQUFjLENBQUM7QUFDdEIsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDdkQsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDckQsT0FBTyxFQUFFLGtCQUFrQixFQUFFLHNCQUFzQixFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDakYsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUMzQyxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDcEQsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQWdEekMsTUFBTSxPQUFPLGtCQUFrQjs7O1lBN0M5QixRQUFRLFNBQUM7Z0JBQ04sT0FBTyxFQUFFO29CQUNMLFlBQVk7b0JBQ1osY0FBYztvQkFDZCxhQUFhO29CQUNiLFVBQVU7b0JBQ1YsWUFBWTtvQkFDWixZQUFZO2lCQUNmO2dCQUNELE9BQU8sRUFBRTtvQkFDTCxVQUFVO29CQUNWLGNBQWM7b0JBQ2QsWUFBWTtvQkFDWixtQkFBbUI7b0JBQ25CLGlCQUFpQjtvQkFDakIsa0JBQWtCO29CQUNsQixzQkFBc0I7b0JBQ3RCLFdBQVc7b0JBQ1gsVUFBVTtvQkFDVixlQUFlO29CQUNmLGdCQUFnQjtvQkFDaEIsY0FBYztpQkFDakI7Z0JBQ0QsWUFBWSxFQUFFO29CQUNWLFVBQVU7b0JBQ1YsY0FBYztvQkFDZCxZQUFZO29CQUNaLG1CQUFtQjtvQkFDbkIsaUJBQWlCO29CQUNqQixrQkFBa0I7b0JBQ2xCLHNCQUFzQjtvQkFDdEIsV0FBVztvQkFDWCxVQUFVO29CQUNWLGVBQWU7b0JBQ2YsZ0JBQWdCO2lCQUNuQjtnQkFDRCxTQUFTLEVBQUU7b0JBQ1AsZ0JBQWdCO29CQUNoQiw4Q0FBOEM7aUJBQ2pEO2dCQUNELGVBQWUsRUFBRTtvQkFDYixtQkFBbUI7b0JBQ25CLGdCQUFnQjtpQkFDbkI7YUFDSiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEExMXlNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jZGsvYTExeSc7XG5pbXBvcnQgeyBPdmVybGF5TW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL292ZXJsYXknO1xuaW1wb3J0IHsgUG9ydGFsTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL3BvcnRhbCc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE1jQnV0dG9uTW9kdWxlIH0gZnJvbSAnQHB0c2VjdXJpdHkvbW9zYWljL2J1dHRvbic7XG5pbXBvcnQgeyBNY0ljb25Nb2R1bGUgfSBmcm9tICdAcHRzZWN1cml0eS9tb3NhaWMvaWNvbic7XG5cbmltcG9ydCB7IE1jQ2FsZW5kYXIsIE1jQ2FsZW5kYXJIZWFkZXIgfSBmcm9tICcuL2NhbGVuZGFyJztcbmltcG9ydCB7IE1jQ2FsZW5kYXJCb2R5IH0gZnJvbSAnLi9jYWxlbmRhci1ib2R5JztcbmltcG9ydCB7XG4gICAgTWNEYXRlcGlja2VyLFxuICAgIE1jRGF0ZXBpY2tlckNvbnRlbnQsXG4gICAgTUNfREFURVBJQ0tFUl9TQ1JPTExfU1RSQVRFR1lfRkFDVE9SWV9QUk9WSURFUlxufSBmcm9tICcuL2RhdGVwaWNrZXInO1xuaW1wb3J0IHsgTWNEYXRlcGlja2VySW5wdXQgfSBmcm9tICcuL2RhdGVwaWNrZXItaW5wdXQnO1xuaW1wb3J0IHsgTWNEYXRlcGlja2VySW50bCB9IGZyb20gJy4vZGF0ZXBpY2tlci1pbnRsJztcbmltcG9ydCB7IE1jRGF0ZXBpY2tlclRvZ2dsZSwgTWNEYXRlcGlja2VyVG9nZ2xlSWNvbiB9IGZyb20gJy4vZGF0ZXBpY2tlci10b2dnbGUnO1xuaW1wb3J0IHsgTWNNb250aFZpZXcgfSBmcm9tICcuL21vbnRoLXZpZXcnO1xuaW1wb3J0IHsgTWNNdWx0aVllYXJWaWV3IH0gZnJvbSAnLi9tdWx0aS15ZWFyLXZpZXcnO1xuaW1wb3J0IHsgTWNZZWFyVmlldyB9IGZyb20gJy4veWVhci12aWV3JztcblxuXG5ATmdNb2R1bGUoe1xuICAgIGltcG9ydHM6IFtcbiAgICAgICAgQ29tbW9uTW9kdWxlLFxuICAgICAgICBNY0J1dHRvbk1vZHVsZSxcbiAgICAgICAgT3ZlcmxheU1vZHVsZSxcbiAgICAgICAgQTExeU1vZHVsZSxcbiAgICAgICAgUG9ydGFsTW9kdWxlLFxuICAgICAgICBNY0ljb25Nb2R1bGVcbiAgICBdLFxuICAgIGV4cG9ydHM6IFtcbiAgICAgICAgTWNDYWxlbmRhcixcbiAgICAgICAgTWNDYWxlbmRhckJvZHksXG4gICAgICAgIE1jRGF0ZXBpY2tlcixcbiAgICAgICAgTWNEYXRlcGlja2VyQ29udGVudCxcbiAgICAgICAgTWNEYXRlcGlja2VySW5wdXQsXG4gICAgICAgIE1jRGF0ZXBpY2tlclRvZ2dsZSxcbiAgICAgICAgTWNEYXRlcGlja2VyVG9nZ2xlSWNvbixcbiAgICAgICAgTWNNb250aFZpZXcsXG4gICAgICAgIE1jWWVhclZpZXcsXG4gICAgICAgIE1jTXVsdGlZZWFyVmlldyxcbiAgICAgICAgTWNDYWxlbmRhckhlYWRlcixcbiAgICAgICAgTWNCdXR0b25Nb2R1bGVcbiAgICBdLFxuICAgIGRlY2xhcmF0aW9uczogW1xuICAgICAgICBNY0NhbGVuZGFyLFxuICAgICAgICBNY0NhbGVuZGFyQm9keSxcbiAgICAgICAgTWNEYXRlcGlja2VyLFxuICAgICAgICBNY0RhdGVwaWNrZXJDb250ZW50LFxuICAgICAgICBNY0RhdGVwaWNrZXJJbnB1dCxcbiAgICAgICAgTWNEYXRlcGlja2VyVG9nZ2xlLFxuICAgICAgICBNY0RhdGVwaWNrZXJUb2dnbGVJY29uLFxuICAgICAgICBNY01vbnRoVmlldyxcbiAgICAgICAgTWNZZWFyVmlldyxcbiAgICAgICAgTWNNdWx0aVllYXJWaWV3LFxuICAgICAgICBNY0NhbGVuZGFySGVhZGVyXG4gICAgXSxcbiAgICBwcm92aWRlcnM6IFtcbiAgICAgICAgTWNEYXRlcGlja2VySW50bCxcbiAgICAgICAgTUNfREFURVBJQ0tFUl9TQ1JPTExfU1RSQVRFR1lfRkFDVE9SWV9QUk9WSURFUlxuICAgIF0sXG4gICAgZW50cnlDb21wb25lbnRzOiBbXG4gICAgICAgIE1jRGF0ZXBpY2tlckNvbnRlbnQsXG4gICAgICAgIE1jQ2FsZW5kYXJIZWFkZXJcbiAgICBdXG59KVxuZXhwb3J0IGNsYXNzIE1jRGF0ZXBpY2tlck1vZHVsZSB7XG59XG4iXX0=