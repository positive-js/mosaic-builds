import { A11yModule } from '@angular/cdk/a11y';
import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { McButtonModule } from '@ptsecurity/mosaic/button';
import { McIconModule } from '@ptsecurity/mosaic/icon';
import { McCalendarBody } from './calendar-body.component';
import { McCalendar, McCalendarHeader } from './calendar.component';
import { McDatepickerInput } from './datepicker-input.directive';
import { McDatepickerIntl } from './datepicker-intl';
import { McDatepickerToggle, McDatepickerToggleIcon } from './datepicker-toggle.component';
import { McDatepicker, McDatepickerContent, MC_DATEPICKER_SCROLL_STRATEGY_FACTORY_PROVIDER } from './datepicker.component';
import { McMonthView } from './month-view.component';
import { McMultiYearView } from './multi-year-view.component';
import { McYearView } from './year-view.component';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZXBpY2tlci1tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wYWNrYWdlcy9tb3NhaWMvZGF0ZXBpY2tlci9kYXRlcGlja2VyLW1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDL0MsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ3JELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUNuRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDM0QsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBRXZELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUMzRCxPQUFPLEVBQUUsVUFBVSxFQUFFLGdCQUFnQixFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDcEUsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDakUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDckQsT0FBTyxFQUFFLGtCQUFrQixFQUFFLHNCQUFzQixFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFDM0YsT0FBTyxFQUNILFlBQVksRUFDWixtQkFBbUIsRUFDbkIsOENBQThDLEVBQ2pELE1BQU0sd0JBQXdCLENBQUM7QUFDaEMsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ3JELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUM5RCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFnRG5ELE1BQU0sT0FBTyxrQkFBa0I7OztZQTdDOUIsUUFBUSxTQUFDO2dCQUNOLE9BQU8sRUFBRTtvQkFDTCxZQUFZO29CQUNaLGNBQWM7b0JBQ2QsYUFBYTtvQkFDYixVQUFVO29CQUNWLFlBQVk7b0JBQ1osWUFBWTtpQkFDZjtnQkFDRCxPQUFPLEVBQUU7b0JBQ0wsVUFBVTtvQkFDVixjQUFjO29CQUNkLFlBQVk7b0JBQ1osbUJBQW1CO29CQUNuQixpQkFBaUI7b0JBQ2pCLGtCQUFrQjtvQkFDbEIsc0JBQXNCO29CQUN0QixXQUFXO29CQUNYLFVBQVU7b0JBQ1YsZUFBZTtvQkFDZixnQkFBZ0I7b0JBQ2hCLGNBQWM7aUJBQ2pCO2dCQUNELFlBQVksRUFBRTtvQkFDVixVQUFVO29CQUNWLGNBQWM7b0JBQ2QsWUFBWTtvQkFDWixtQkFBbUI7b0JBQ25CLGlCQUFpQjtvQkFDakIsa0JBQWtCO29CQUNsQixzQkFBc0I7b0JBQ3RCLFdBQVc7b0JBQ1gsVUFBVTtvQkFDVixlQUFlO29CQUNmLGdCQUFnQjtpQkFDbkI7Z0JBQ0QsU0FBUyxFQUFFO29CQUNQLGdCQUFnQjtvQkFDaEIsOENBQThDO2lCQUNqRDtnQkFDRCxlQUFlLEVBQUU7b0JBQ2IsbUJBQW1CO29CQUNuQixnQkFBZ0I7aUJBQ25CO2FBQ0oiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBMTF5TW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2ExMXknO1xuaW1wb3J0IHsgT3ZlcmxheU1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9vdmVybGF5JztcbmltcG9ydCB7IFBvcnRhbE1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9wb3J0YWwnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBNY0J1dHRvbk1vZHVsZSB9IGZyb20gJ0BwdHNlY3VyaXR5L21vc2FpYy9idXR0b24nO1xuaW1wb3J0IHsgTWNJY29uTW9kdWxlIH0gZnJvbSAnQHB0c2VjdXJpdHkvbW9zYWljL2ljb24nO1xuXG5pbXBvcnQgeyBNY0NhbGVuZGFyQm9keSB9IGZyb20gJy4vY2FsZW5kYXItYm9keS5jb21wb25lbnQnO1xuaW1wb3J0IHsgTWNDYWxlbmRhciwgTWNDYWxlbmRhckhlYWRlciB9IGZyb20gJy4vY2FsZW5kYXIuY29tcG9uZW50JztcbmltcG9ydCB7IE1jRGF0ZXBpY2tlcklucHV0IH0gZnJvbSAnLi9kYXRlcGlja2VyLWlucHV0LmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBNY0RhdGVwaWNrZXJJbnRsIH0gZnJvbSAnLi9kYXRlcGlja2VyLWludGwnO1xuaW1wb3J0IHsgTWNEYXRlcGlja2VyVG9nZ2xlLCBNY0RhdGVwaWNrZXJUb2dnbGVJY29uIH0gZnJvbSAnLi9kYXRlcGlja2VyLXRvZ2dsZS5jb21wb25lbnQnO1xuaW1wb3J0IHtcbiAgICBNY0RhdGVwaWNrZXIsXG4gICAgTWNEYXRlcGlja2VyQ29udGVudCxcbiAgICBNQ19EQVRFUElDS0VSX1NDUk9MTF9TVFJBVEVHWV9GQUNUT1JZX1BST1ZJREVSXG59IGZyb20gJy4vZGF0ZXBpY2tlci5jb21wb25lbnQnO1xuaW1wb3J0IHsgTWNNb250aFZpZXcgfSBmcm9tICcuL21vbnRoLXZpZXcuY29tcG9uZW50JztcbmltcG9ydCB7IE1jTXVsdGlZZWFyVmlldyB9IGZyb20gJy4vbXVsdGkteWVhci12aWV3LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBNY1llYXJWaWV3IH0gZnJvbSAnLi95ZWFyLXZpZXcuY29tcG9uZW50JztcblxuXG5ATmdNb2R1bGUoe1xuICAgIGltcG9ydHM6IFtcbiAgICAgICAgQ29tbW9uTW9kdWxlLFxuICAgICAgICBNY0J1dHRvbk1vZHVsZSxcbiAgICAgICAgT3ZlcmxheU1vZHVsZSxcbiAgICAgICAgQTExeU1vZHVsZSxcbiAgICAgICAgUG9ydGFsTW9kdWxlLFxuICAgICAgICBNY0ljb25Nb2R1bGVcbiAgICBdLFxuICAgIGV4cG9ydHM6IFtcbiAgICAgICAgTWNDYWxlbmRhcixcbiAgICAgICAgTWNDYWxlbmRhckJvZHksXG4gICAgICAgIE1jRGF0ZXBpY2tlcixcbiAgICAgICAgTWNEYXRlcGlja2VyQ29udGVudCxcbiAgICAgICAgTWNEYXRlcGlja2VySW5wdXQsXG4gICAgICAgIE1jRGF0ZXBpY2tlclRvZ2dsZSxcbiAgICAgICAgTWNEYXRlcGlja2VyVG9nZ2xlSWNvbixcbiAgICAgICAgTWNNb250aFZpZXcsXG4gICAgICAgIE1jWWVhclZpZXcsXG4gICAgICAgIE1jTXVsdGlZZWFyVmlldyxcbiAgICAgICAgTWNDYWxlbmRhckhlYWRlcixcbiAgICAgICAgTWNCdXR0b25Nb2R1bGVcbiAgICBdLFxuICAgIGRlY2xhcmF0aW9uczogW1xuICAgICAgICBNY0NhbGVuZGFyLFxuICAgICAgICBNY0NhbGVuZGFyQm9keSxcbiAgICAgICAgTWNEYXRlcGlja2VyLFxuICAgICAgICBNY0RhdGVwaWNrZXJDb250ZW50LFxuICAgICAgICBNY0RhdGVwaWNrZXJJbnB1dCxcbiAgICAgICAgTWNEYXRlcGlja2VyVG9nZ2xlLFxuICAgICAgICBNY0RhdGVwaWNrZXJUb2dnbGVJY29uLFxuICAgICAgICBNY01vbnRoVmlldyxcbiAgICAgICAgTWNZZWFyVmlldyxcbiAgICAgICAgTWNNdWx0aVllYXJWaWV3LFxuICAgICAgICBNY0NhbGVuZGFySGVhZGVyXG4gICAgXSxcbiAgICBwcm92aWRlcnM6IFtcbiAgICAgICAgTWNEYXRlcGlja2VySW50bCxcbiAgICAgICAgTUNfREFURVBJQ0tFUl9TQ1JPTExfU1RSQVRFR1lfRkFDVE9SWV9QUk9WSURFUlxuICAgIF0sXG4gICAgZW50cnlDb21wb25lbnRzOiBbXG4gICAgICAgIE1jRGF0ZXBpY2tlckNvbnRlbnQsXG4gICAgICAgIE1jQ2FsZW5kYXJIZWFkZXJcbiAgICBdXG59KVxuZXhwb3J0IGNsYXNzIE1jRGF0ZXBpY2tlck1vZHVsZSB7XG59XG4iXX0=