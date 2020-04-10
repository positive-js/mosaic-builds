/**
 * @fileoverview added by tsickle
 * Generated from: tabs.module.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { A11yModule } from '@angular/cdk/a11y';
import { PortalModule } from '@angular/cdk/portal';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { McCommonModule } from '@ptsecurity/mosaic/core';
import { McTab } from './tab';
import { McTabBody, McTabBodyPortal } from './tab-body';
import { McTabContent } from './tab-content';
import { McTabGroup, McLightTabsCssStyler, McAlignTabsCenterCssStyler, McAlignTabsEndCssStyler, McStretchTabsCssStyler } from './tab-group';
import { McTabHeader } from './tab-header';
import { McTabLabel } from './tab-label';
import { McTabLabelWrapper } from './tab-label-wrapper';
import { McTabLink, McTabNav } from './tab-nav-bar/tab-nav-bar';
export class McTabsModule {
}
McTabsModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    McCommonModule,
                    PortalModule,
                    A11yModule
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
                    McLightTabsCssStyler,
                    McAlignTabsCenterCssStyler,
                    McAlignTabsEndCssStyler,
                    McStretchTabsCssStyler
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
                    McLightTabsCssStyler,
                    McAlignTabsCenterCssStyler,
                    McAlignTabsEndCssStyler,
                    McStretchTabsCssStyler
                ]
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFicy5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AcHRzZWN1cml0eS9tb3NhaWMvdGFicy8iLCJzb3VyY2VzIjpbInRhYnMubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUNuRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFFekQsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLE9BQU8sQ0FBQztBQUM5QixPQUFPLEVBQUUsU0FBUyxFQUFFLGVBQWUsRUFBRSxNQUFNLFlBQVksQ0FBQztBQUN4RCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzdDLE9BQU8sRUFDSCxVQUFVLEVBQ1Ysb0JBQW9CLEVBQ3BCLDBCQUEwQixFQUMxQix1QkFBdUIsRUFDdkIsc0JBQXNCLEVBQ3pCLE1BQU0sYUFBYSxDQUFDO0FBQ3JCLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFDM0MsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUN6QyxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUN4RCxPQUFPLEVBQUUsU0FBUyxFQUFFLFFBQVEsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBeUNoRSxNQUFNLE9BQU8sWUFBWTs7O1lBdEN4QixRQUFRLFNBQUM7Z0JBQ04sT0FBTyxFQUFFO29CQUNMLFlBQVk7b0JBQ1osY0FBYztvQkFDZCxZQUFZO29CQUNaLFVBQVU7aUJBQ2I7O2dCQUVELE9BQU8sRUFBRTtvQkFDTCxjQUFjO29CQUNkLFVBQVU7b0JBQ1YsVUFBVTtvQkFDVixLQUFLO29CQUNMLFFBQVE7b0JBQ1IsU0FBUztvQkFDVCxZQUFZO29CQUNaLG9CQUFvQjtvQkFDcEIsMEJBQTBCO29CQUMxQix1QkFBdUI7b0JBQ3ZCLHNCQUFzQjtpQkFDekI7Z0JBQ0QsWUFBWSxFQUFFO29CQUNWLFVBQVU7b0JBQ1YsVUFBVTtvQkFDVixLQUFLO29CQUNMLGlCQUFpQjtvQkFDakIsUUFBUTtvQkFDUixTQUFTO29CQUNULFNBQVM7b0JBQ1QsZUFBZTtvQkFDZixXQUFXO29CQUNYLFlBQVk7b0JBQ1osb0JBQW9CO29CQUNwQiwwQkFBMEI7b0JBQzFCLHVCQUF1QjtvQkFDdkIsc0JBQXNCO2lCQUN6QjthQUNKIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQTExeU1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9hMTF5JztcbmltcG9ydCB7IFBvcnRhbE1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9wb3J0YWwnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBNY0NvbW1vbk1vZHVsZSB9IGZyb20gJ0BwdHNlY3VyaXR5L21vc2FpYy9jb3JlJztcblxuaW1wb3J0IHsgTWNUYWIgfSBmcm9tICcuL3RhYic7XG5pbXBvcnQgeyBNY1RhYkJvZHksIE1jVGFiQm9keVBvcnRhbCB9IGZyb20gJy4vdGFiLWJvZHknO1xuaW1wb3J0IHsgTWNUYWJDb250ZW50IH0gZnJvbSAnLi90YWItY29udGVudCc7XG5pbXBvcnQge1xuICAgIE1jVGFiR3JvdXAsXG4gICAgTWNMaWdodFRhYnNDc3NTdHlsZXIsXG4gICAgTWNBbGlnblRhYnNDZW50ZXJDc3NTdHlsZXIsXG4gICAgTWNBbGlnblRhYnNFbmRDc3NTdHlsZXIsXG4gICAgTWNTdHJldGNoVGFic0Nzc1N0eWxlclxufSBmcm9tICcuL3RhYi1ncm91cCc7XG5pbXBvcnQgeyBNY1RhYkhlYWRlciB9IGZyb20gJy4vdGFiLWhlYWRlcic7XG5pbXBvcnQgeyBNY1RhYkxhYmVsIH0gZnJvbSAnLi90YWItbGFiZWwnO1xuaW1wb3J0IHsgTWNUYWJMYWJlbFdyYXBwZXIgfSBmcm9tICcuL3RhYi1sYWJlbC13cmFwcGVyJztcbmltcG9ydCB7IE1jVGFiTGluaywgTWNUYWJOYXYgfSBmcm9tICcuL3RhYi1uYXYtYmFyL3RhYi1uYXYtYmFyJztcblxuXG5ATmdNb2R1bGUoe1xuICAgIGltcG9ydHM6IFtcbiAgICAgICAgQ29tbW9uTW9kdWxlLFxuICAgICAgICBNY0NvbW1vbk1vZHVsZSxcbiAgICAgICAgUG9ydGFsTW9kdWxlLFxuICAgICAgICBBMTF5TW9kdWxlXG4gICAgXSxcbiAgICAvLyBEb24ndCBleHBvcnQgYWxsIGNvbXBvbmVudHMgYmVjYXVzZSBzb21lIGFyZSBvbmx5IHRvIGJlIHVzZWQgaW50ZXJuYWxseS5cbiAgICBleHBvcnRzOiBbXG4gICAgICAgIE1jQ29tbW9uTW9kdWxlLFxuICAgICAgICBNY1RhYkdyb3VwLFxuICAgICAgICBNY1RhYkxhYmVsLFxuICAgICAgICBNY1RhYixcbiAgICAgICAgTWNUYWJOYXYsXG4gICAgICAgIE1jVGFiTGluayxcbiAgICAgICAgTWNUYWJDb250ZW50LFxuICAgICAgICBNY0xpZ2h0VGFic0Nzc1N0eWxlcixcbiAgICAgICAgTWNBbGlnblRhYnNDZW50ZXJDc3NTdHlsZXIsXG4gICAgICAgIE1jQWxpZ25UYWJzRW5kQ3NzU3R5bGVyLFxuICAgICAgICBNY1N0cmV0Y2hUYWJzQ3NzU3R5bGVyXG4gICAgXSxcbiAgICBkZWNsYXJhdGlvbnM6IFtcbiAgICAgICAgTWNUYWJHcm91cCxcbiAgICAgICAgTWNUYWJMYWJlbCxcbiAgICAgICAgTWNUYWIsXG4gICAgICAgIE1jVGFiTGFiZWxXcmFwcGVyLFxuICAgICAgICBNY1RhYk5hdixcbiAgICAgICAgTWNUYWJMaW5rLFxuICAgICAgICBNY1RhYkJvZHksXG4gICAgICAgIE1jVGFiQm9keVBvcnRhbCxcbiAgICAgICAgTWNUYWJIZWFkZXIsXG4gICAgICAgIE1jVGFiQ29udGVudCxcbiAgICAgICAgTWNMaWdodFRhYnNDc3NTdHlsZXIsXG4gICAgICAgIE1jQWxpZ25UYWJzQ2VudGVyQ3NzU3R5bGVyLFxuICAgICAgICBNY0FsaWduVGFic0VuZENzc1N0eWxlcixcbiAgICAgICAgTWNTdHJldGNoVGFic0Nzc1N0eWxlclxuICAgIF1cbn0pXG5leHBvcnQgY2xhc3MgTWNUYWJzTW9kdWxlIHt9XG4iXX0=