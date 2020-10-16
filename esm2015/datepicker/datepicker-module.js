/**
 * @fileoverview added by tsickle
 * Generated from: datepicker-module.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZXBpY2tlci1tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiL2hvbWUvY2lyY2xlY2kvbW9zYWljL3BhY2thZ2VzL21vc2FpYy9kYXRlcGlja2VyLyIsInNvdXJjZXMiOlsiZGF0ZXBpY2tlci1tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDL0MsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ3JELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUNuRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDM0QsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBRXZELE9BQU8sRUFBRSxVQUFVLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxZQUFZLENBQUM7QUFDMUQsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ2pELE9BQU8sRUFDSCxZQUFZLEVBQ1osbUJBQW1CLEVBQ25CLDhDQUE4QyxFQUNqRCxNQUFNLGNBQWMsQ0FBQztBQUN0QixPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUN2RCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUNyRCxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUNqRixPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBQzNDLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUNwRCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBZ0R6QyxNQUFNLE9BQU8sa0JBQWtCOzs7WUE3QzlCLFFBQVEsU0FBQztnQkFDTixPQUFPLEVBQUU7b0JBQ0wsWUFBWTtvQkFDWixjQUFjO29CQUNkLGFBQWE7b0JBQ2IsVUFBVTtvQkFDVixZQUFZO29CQUNaLFlBQVk7aUJBQ2Y7Z0JBQ0QsT0FBTyxFQUFFO29CQUNMLFVBQVU7b0JBQ1YsY0FBYztvQkFDZCxZQUFZO29CQUNaLG1CQUFtQjtvQkFDbkIsaUJBQWlCO29CQUNqQixrQkFBa0I7b0JBQ2xCLHNCQUFzQjtvQkFDdEIsV0FBVztvQkFDWCxVQUFVO29CQUNWLGVBQWU7b0JBQ2YsZ0JBQWdCO29CQUNoQixjQUFjO2lCQUNqQjtnQkFDRCxZQUFZLEVBQUU7b0JBQ1YsVUFBVTtvQkFDVixjQUFjO29CQUNkLFlBQVk7b0JBQ1osbUJBQW1CO29CQUNuQixpQkFBaUI7b0JBQ2pCLGtCQUFrQjtvQkFDbEIsc0JBQXNCO29CQUN0QixXQUFXO29CQUNYLFVBQVU7b0JBQ1YsZUFBZTtvQkFDZixnQkFBZ0I7aUJBQ25CO2dCQUNELFNBQVMsRUFBRTtvQkFDUCxnQkFBZ0I7b0JBQ2hCLDhDQUE4QztpQkFDakQ7Z0JBQ0QsZUFBZSxFQUFFO29CQUNiLG1CQUFtQjtvQkFDbkIsZ0JBQWdCO2lCQUNuQjthQUNKIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQTExeU1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9hMTF5JztcbmltcG9ydCB7IE92ZXJsYXlNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jZGsvb3ZlcmxheSc7XG5pbXBvcnQgeyBQb3J0YWxNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jZGsvcG9ydGFsJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTWNCdXR0b25Nb2R1bGUgfSBmcm9tICdAcHRzZWN1cml0eS9tb3NhaWMvYnV0dG9uJztcbmltcG9ydCB7IE1jSWNvbk1vZHVsZSB9IGZyb20gJ0BwdHNlY3VyaXR5L21vc2FpYy9pY29uJztcblxuaW1wb3J0IHsgTWNDYWxlbmRhciwgTWNDYWxlbmRhckhlYWRlciB9IGZyb20gJy4vY2FsZW5kYXInO1xuaW1wb3J0IHsgTWNDYWxlbmRhckJvZHkgfSBmcm9tICcuL2NhbGVuZGFyLWJvZHknO1xuaW1wb3J0IHtcbiAgICBNY0RhdGVwaWNrZXIsXG4gICAgTWNEYXRlcGlja2VyQ29udGVudCxcbiAgICBNQ19EQVRFUElDS0VSX1NDUk9MTF9TVFJBVEVHWV9GQUNUT1JZX1BST1ZJREVSXG59IGZyb20gJy4vZGF0ZXBpY2tlcic7XG5pbXBvcnQgeyBNY0RhdGVwaWNrZXJJbnB1dCB9IGZyb20gJy4vZGF0ZXBpY2tlci1pbnB1dCc7XG5pbXBvcnQgeyBNY0RhdGVwaWNrZXJJbnRsIH0gZnJvbSAnLi9kYXRlcGlja2VyLWludGwnO1xuaW1wb3J0IHsgTWNEYXRlcGlja2VyVG9nZ2xlLCBNY0RhdGVwaWNrZXJUb2dnbGVJY29uIH0gZnJvbSAnLi9kYXRlcGlja2VyLXRvZ2dsZSc7XG5pbXBvcnQgeyBNY01vbnRoVmlldyB9IGZyb20gJy4vbW9udGgtdmlldyc7XG5pbXBvcnQgeyBNY011bHRpWWVhclZpZXcgfSBmcm9tICcuL211bHRpLXllYXItdmlldyc7XG5pbXBvcnQgeyBNY1llYXJWaWV3IH0gZnJvbSAnLi95ZWFyLXZpZXcnO1xuXG5cbkBOZ01vZHVsZSh7XG4gICAgaW1wb3J0czogW1xuICAgICAgICBDb21tb25Nb2R1bGUsXG4gICAgICAgIE1jQnV0dG9uTW9kdWxlLFxuICAgICAgICBPdmVybGF5TW9kdWxlLFxuICAgICAgICBBMTF5TW9kdWxlLFxuICAgICAgICBQb3J0YWxNb2R1bGUsXG4gICAgICAgIE1jSWNvbk1vZHVsZVxuICAgIF0sXG4gICAgZXhwb3J0czogW1xuICAgICAgICBNY0NhbGVuZGFyLFxuICAgICAgICBNY0NhbGVuZGFyQm9keSxcbiAgICAgICAgTWNEYXRlcGlja2VyLFxuICAgICAgICBNY0RhdGVwaWNrZXJDb250ZW50LFxuICAgICAgICBNY0RhdGVwaWNrZXJJbnB1dCxcbiAgICAgICAgTWNEYXRlcGlja2VyVG9nZ2xlLFxuICAgICAgICBNY0RhdGVwaWNrZXJUb2dnbGVJY29uLFxuICAgICAgICBNY01vbnRoVmlldyxcbiAgICAgICAgTWNZZWFyVmlldyxcbiAgICAgICAgTWNNdWx0aVllYXJWaWV3LFxuICAgICAgICBNY0NhbGVuZGFySGVhZGVyLFxuICAgICAgICBNY0J1dHRvbk1vZHVsZVxuICAgIF0sXG4gICAgZGVjbGFyYXRpb25zOiBbXG4gICAgICAgIE1jQ2FsZW5kYXIsXG4gICAgICAgIE1jQ2FsZW5kYXJCb2R5LFxuICAgICAgICBNY0RhdGVwaWNrZXIsXG4gICAgICAgIE1jRGF0ZXBpY2tlckNvbnRlbnQsXG4gICAgICAgIE1jRGF0ZXBpY2tlcklucHV0LFxuICAgICAgICBNY0RhdGVwaWNrZXJUb2dnbGUsXG4gICAgICAgIE1jRGF0ZXBpY2tlclRvZ2dsZUljb24sXG4gICAgICAgIE1jTW9udGhWaWV3LFxuICAgICAgICBNY1llYXJWaWV3LFxuICAgICAgICBNY011bHRpWWVhclZpZXcsXG4gICAgICAgIE1jQ2FsZW5kYXJIZWFkZXJcbiAgICBdLFxuICAgIHByb3ZpZGVyczogW1xuICAgICAgICBNY0RhdGVwaWNrZXJJbnRsLFxuICAgICAgICBNQ19EQVRFUElDS0VSX1NDUk9MTF9TVFJBVEVHWV9GQUNUT1JZX1BST1ZJREVSXG4gICAgXSxcbiAgICBlbnRyeUNvbXBvbmVudHM6IFtcbiAgICAgICAgTWNEYXRlcGlja2VyQ29udGVudCxcbiAgICAgICAgTWNDYWxlbmRhckhlYWRlclxuICAgIF1cbn0pXG5leHBvcnQgY2xhc3MgTWNEYXRlcGlja2VyTW9kdWxlIHtcbn1cbiJdfQ==