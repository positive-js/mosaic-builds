import { A11yModule } from '@angular/cdk/a11y';
import { PortalModule } from '@angular/cdk/portal';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { McCommonModule } from '@ptsecurity/mosaic/core';
import { McIconModule } from '@ptsecurity/mosaic/icon';
import { McToolTipModule } from '@ptsecurity/mosaic/tooltip';
import { McTabBody, McTabBodyPortal } from './tab-body.component';
import { McTabContent } from './tab-content.directive';
import { McTabGroup, McOldTabsCssStyler, McAlignTabsCenterCssStyler, McAlignTabsEndCssStyler, McStretchTabsCssStyler, McVerticalTabsCssStyler } from './tab-group.component';
import { McTabHeader } from './tab-header.component';
import { McTabLabelWrapper } from './tab-label-wrapper.directive';
import { McTabLabel } from './tab-label.directive';
import { McTabLink, McTabNav } from './tab-nav-bar/index';
import { McTab } from './tab.component';
export class McTabsModule {
}
McTabsModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    PortalModule,
                    A11yModule,
                    McCommonModule,
                    McIconModule,
                    McToolTipModule
                ],
                // Don't export all components because some are only to be used internally.
                exports: [
                    McCommonModule,
                    McTabGroup,
                    McTabLabel,
                    McTab,
                    McTabNav,
                    McTabLink,
                    McTabContent,
                    McOldTabsCssStyler,
                    McAlignTabsCenterCssStyler,
                    McAlignTabsEndCssStyler,
                    McStretchTabsCssStyler,
                    McVerticalTabsCssStyler
                ],
                declarations: [
                    McTabGroup,
                    McTabLabel,
                    McTab,
                    McTabLabelWrapper,
                    McTabNav,
                    McTabLink,
                    McTabBody,
                    McTabBodyPortal,
                    McTabHeader,
                    McTabContent,
                    McOldTabsCssStyler,
                    McAlignTabsCenterCssStyler,
                    McAlignTabsEndCssStyler,
                    McStretchTabsCssStyler,
                    McVerticalTabsCssStyler
                ]
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFicy5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wYWNrYWdlcy9tb3NhaWMvdGFicy90YWJzLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDL0MsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ25ELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUN6RCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDdkQsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBRTdELE9BQU8sRUFBRSxTQUFTLEVBQUUsZUFBZSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDbEUsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQ3ZELE9BQU8sRUFDSCxVQUFVLEVBQ1Ysa0JBQWtCLEVBQ2xCLDBCQUEwQixFQUMxQix1QkFBdUIsRUFDdkIsc0JBQXNCLEVBQ3RCLHVCQUF1QixFQUMxQixNQUFNLHVCQUF1QixDQUFDO0FBQy9CLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUNyRCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUNsRSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDbkQsT0FBTyxFQUFFLFNBQVMsRUFBRSxRQUFRLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUMxRCxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUE2Q3hDLE1BQU0sT0FBTyxZQUFZOzs7WUExQ3hCLFFBQVEsU0FBQztnQkFDTixPQUFPLEVBQUU7b0JBQ0wsWUFBWTtvQkFDWixZQUFZO29CQUNaLFVBQVU7b0JBQ1YsY0FBYztvQkFDZCxZQUFZO29CQUNaLGVBQWU7aUJBQ2xCO2dCQUNELDJFQUEyRTtnQkFDM0UsT0FBTyxFQUFFO29CQUNMLGNBQWM7b0JBQ2QsVUFBVTtvQkFDVixVQUFVO29CQUNWLEtBQUs7b0JBQ0wsUUFBUTtvQkFDUixTQUFTO29CQUNULFlBQVk7b0JBQ1osa0JBQWtCO29CQUNsQiwwQkFBMEI7b0JBQzFCLHVCQUF1QjtvQkFDdkIsc0JBQXNCO29CQUN0Qix1QkFBdUI7aUJBQzFCO2dCQUNELFlBQVksRUFBRTtvQkFDVixVQUFVO29CQUNWLFVBQVU7b0JBQ1YsS0FBSztvQkFDTCxpQkFBaUI7b0JBQ2pCLFFBQVE7b0JBQ1IsU0FBUztvQkFDVCxTQUFTO29CQUNULGVBQWU7b0JBQ2YsV0FBVztvQkFDWCxZQUFZO29CQUNaLGtCQUFrQjtvQkFDbEIsMEJBQTBCO29CQUMxQix1QkFBdUI7b0JBQ3ZCLHNCQUFzQjtvQkFDdEIsdUJBQXVCO2lCQUMxQjthQUNKIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQTExeU1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9hMTF5JztcbmltcG9ydCB7IFBvcnRhbE1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9wb3J0YWwnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBNY0NvbW1vbk1vZHVsZSB9IGZyb20gJ0BwdHNlY3VyaXR5L21vc2FpYy9jb3JlJztcbmltcG9ydCB7IE1jSWNvbk1vZHVsZSB9IGZyb20gJ0BwdHNlY3VyaXR5L21vc2FpYy9pY29uJztcbmltcG9ydCB7IE1jVG9vbFRpcE1vZHVsZSB9IGZyb20gJ0BwdHNlY3VyaXR5L21vc2FpYy90b29sdGlwJztcblxuaW1wb3J0IHsgTWNUYWJCb2R5LCBNY1RhYkJvZHlQb3J0YWwgfSBmcm9tICcuL3RhYi1ib2R5LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBNY1RhYkNvbnRlbnQgfSBmcm9tICcuL3RhYi1jb250ZW50LmRpcmVjdGl2ZSc7XG5pbXBvcnQge1xuICAgIE1jVGFiR3JvdXAsXG4gICAgTWNPbGRUYWJzQ3NzU3R5bGVyLFxuICAgIE1jQWxpZ25UYWJzQ2VudGVyQ3NzU3R5bGVyLFxuICAgIE1jQWxpZ25UYWJzRW5kQ3NzU3R5bGVyLFxuICAgIE1jU3RyZXRjaFRhYnNDc3NTdHlsZXIsXG4gICAgTWNWZXJ0aWNhbFRhYnNDc3NTdHlsZXJcbn0gZnJvbSAnLi90YWItZ3JvdXAuY29tcG9uZW50JztcbmltcG9ydCB7IE1jVGFiSGVhZGVyIH0gZnJvbSAnLi90YWItaGVhZGVyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBNY1RhYkxhYmVsV3JhcHBlciB9IGZyb20gJy4vdGFiLWxhYmVsLXdyYXBwZXIuZGlyZWN0aXZlJztcbmltcG9ydCB7IE1jVGFiTGFiZWwgfSBmcm9tICcuL3RhYi1sYWJlbC5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgTWNUYWJMaW5rLCBNY1RhYk5hdiB9IGZyb20gJy4vdGFiLW5hdi1iYXIvaW5kZXgnO1xuaW1wb3J0IHsgTWNUYWIgfSBmcm9tICcuL3RhYi5jb21wb25lbnQnO1xuXG5cbkBOZ01vZHVsZSh7XG4gICAgaW1wb3J0czogW1xuICAgICAgICBDb21tb25Nb2R1bGUsXG4gICAgICAgIFBvcnRhbE1vZHVsZSxcbiAgICAgICAgQTExeU1vZHVsZSxcbiAgICAgICAgTWNDb21tb25Nb2R1bGUsXG4gICAgICAgIE1jSWNvbk1vZHVsZSxcbiAgICAgICAgTWNUb29sVGlwTW9kdWxlXG4gICAgXSxcbiAgICAvLyBEb24ndCBleHBvcnQgYWxsIGNvbXBvbmVudHMgYmVjYXVzZSBzb21lIGFyZSBvbmx5IHRvIGJlIHVzZWQgaW50ZXJuYWxseS5cbiAgICBleHBvcnRzOiBbXG4gICAgICAgIE1jQ29tbW9uTW9kdWxlLFxuICAgICAgICBNY1RhYkdyb3VwLFxuICAgICAgICBNY1RhYkxhYmVsLFxuICAgICAgICBNY1RhYixcbiAgICAgICAgTWNUYWJOYXYsXG4gICAgICAgIE1jVGFiTGluayxcbiAgICAgICAgTWNUYWJDb250ZW50LFxuICAgICAgICBNY09sZFRhYnNDc3NTdHlsZXIsXG4gICAgICAgIE1jQWxpZ25UYWJzQ2VudGVyQ3NzU3R5bGVyLFxuICAgICAgICBNY0FsaWduVGFic0VuZENzc1N0eWxlcixcbiAgICAgICAgTWNTdHJldGNoVGFic0Nzc1N0eWxlcixcbiAgICAgICAgTWNWZXJ0aWNhbFRhYnNDc3NTdHlsZXJcbiAgICBdLFxuICAgIGRlY2xhcmF0aW9uczogW1xuICAgICAgICBNY1RhYkdyb3VwLFxuICAgICAgICBNY1RhYkxhYmVsLFxuICAgICAgICBNY1RhYixcbiAgICAgICAgTWNUYWJMYWJlbFdyYXBwZXIsXG4gICAgICAgIE1jVGFiTmF2LFxuICAgICAgICBNY1RhYkxpbmssXG4gICAgICAgIE1jVGFiQm9keSxcbiAgICAgICAgTWNUYWJCb2R5UG9ydGFsLFxuICAgICAgICBNY1RhYkhlYWRlcixcbiAgICAgICAgTWNUYWJDb250ZW50LFxuICAgICAgICBNY09sZFRhYnNDc3NTdHlsZXIsXG4gICAgICAgIE1jQWxpZ25UYWJzQ2VudGVyQ3NzU3R5bGVyLFxuICAgICAgICBNY0FsaWduVGFic0VuZENzc1N0eWxlcixcbiAgICAgICAgTWNTdHJldGNoVGFic0Nzc1N0eWxlcixcbiAgICAgICAgTWNWZXJ0aWNhbFRhYnNDc3NTdHlsZXJcbiAgICBdXG59KVxuZXhwb3J0IGNsYXNzIE1jVGFic01vZHVsZSB7fVxuIl19