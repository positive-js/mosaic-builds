/**
 * @fileoverview added by tsickle
 * Generated from: tabs.module.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFicy5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiL2hvbWUvY2lyY2xlY2kvbW9zYWljL3BhY2thZ2VzL21vc2FpYy90YWJzLyIsInNvdXJjZXMiOlsidGFicy5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDL0MsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ25ELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUV6RCxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sT0FBTyxDQUFDO0FBQzlCLE9BQU8sRUFBRSxTQUFTLEVBQUUsZUFBZSxFQUFFLE1BQU0sWUFBWSxDQUFDO0FBQ3hELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDN0MsT0FBTyxFQUNILFVBQVUsRUFDVixvQkFBb0IsRUFDcEIsMEJBQTBCLEVBQzFCLHVCQUF1QixFQUN2QixzQkFBc0IsRUFDekIsTUFBTSxhQUFhLENBQUM7QUFDckIsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUMzQyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ3hELE9BQU8sRUFBRSxTQUFTLEVBQUUsUUFBUSxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUF5Q2hFLE1BQU0sT0FBTyxZQUFZOzs7WUF0Q3hCLFFBQVEsU0FBQztnQkFDTixPQUFPLEVBQUU7b0JBQ0wsWUFBWTtvQkFDWixjQUFjO29CQUNkLFlBQVk7b0JBQ1osVUFBVTtpQkFDYjs7Z0JBRUQsT0FBTyxFQUFFO29CQUNMLGNBQWM7b0JBQ2QsVUFBVTtvQkFDVixVQUFVO29CQUNWLEtBQUs7b0JBQ0wsUUFBUTtvQkFDUixTQUFTO29CQUNULFlBQVk7b0JBQ1osb0JBQW9CO29CQUNwQiwwQkFBMEI7b0JBQzFCLHVCQUF1QjtvQkFDdkIsc0JBQXNCO2lCQUN6QjtnQkFDRCxZQUFZLEVBQUU7b0JBQ1YsVUFBVTtvQkFDVixVQUFVO29CQUNWLEtBQUs7b0JBQ0wsaUJBQWlCO29CQUNqQixRQUFRO29CQUNSLFNBQVM7b0JBQ1QsU0FBUztvQkFDVCxlQUFlO29CQUNmLFdBQVc7b0JBQ1gsWUFBWTtvQkFDWixvQkFBb0I7b0JBQ3BCLDBCQUEwQjtvQkFDMUIsdUJBQXVCO29CQUN2QixzQkFBc0I7aUJBQ3pCO2FBQ0oiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBMTF5TW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2ExMXknO1xuaW1wb3J0IHsgUG9ydGFsTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL3BvcnRhbCc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE1jQ29tbW9uTW9kdWxlIH0gZnJvbSAnQHB0c2VjdXJpdHkvbW9zYWljL2NvcmUnO1xuXG5pbXBvcnQgeyBNY1RhYiB9IGZyb20gJy4vdGFiJztcbmltcG9ydCB7IE1jVGFiQm9keSwgTWNUYWJCb2R5UG9ydGFsIH0gZnJvbSAnLi90YWItYm9keSc7XG5pbXBvcnQgeyBNY1RhYkNvbnRlbnQgfSBmcm9tICcuL3RhYi1jb250ZW50JztcbmltcG9ydCB7XG4gICAgTWNUYWJHcm91cCxcbiAgICBNY0xpZ2h0VGFic0Nzc1N0eWxlcixcbiAgICBNY0FsaWduVGFic0NlbnRlckNzc1N0eWxlcixcbiAgICBNY0FsaWduVGFic0VuZENzc1N0eWxlcixcbiAgICBNY1N0cmV0Y2hUYWJzQ3NzU3R5bGVyXG59IGZyb20gJy4vdGFiLWdyb3VwJztcbmltcG9ydCB7IE1jVGFiSGVhZGVyIH0gZnJvbSAnLi90YWItaGVhZGVyJztcbmltcG9ydCB7IE1jVGFiTGFiZWwgfSBmcm9tICcuL3RhYi1sYWJlbCc7XG5pbXBvcnQgeyBNY1RhYkxhYmVsV3JhcHBlciB9IGZyb20gJy4vdGFiLWxhYmVsLXdyYXBwZXInO1xuaW1wb3J0IHsgTWNUYWJMaW5rLCBNY1RhYk5hdiB9IGZyb20gJy4vdGFiLW5hdi1iYXIvdGFiLW5hdi1iYXInO1xuXG5cbkBOZ01vZHVsZSh7XG4gICAgaW1wb3J0czogW1xuICAgICAgICBDb21tb25Nb2R1bGUsXG4gICAgICAgIE1jQ29tbW9uTW9kdWxlLFxuICAgICAgICBQb3J0YWxNb2R1bGUsXG4gICAgICAgIEExMXlNb2R1bGVcbiAgICBdLFxuICAgIC8vIERvbid0IGV4cG9ydCBhbGwgY29tcG9uZW50cyBiZWNhdXNlIHNvbWUgYXJlIG9ubHkgdG8gYmUgdXNlZCBpbnRlcm5hbGx5LlxuICAgIGV4cG9ydHM6IFtcbiAgICAgICAgTWNDb21tb25Nb2R1bGUsXG4gICAgICAgIE1jVGFiR3JvdXAsXG4gICAgICAgIE1jVGFiTGFiZWwsXG4gICAgICAgIE1jVGFiLFxuICAgICAgICBNY1RhYk5hdixcbiAgICAgICAgTWNUYWJMaW5rLFxuICAgICAgICBNY1RhYkNvbnRlbnQsXG4gICAgICAgIE1jTGlnaHRUYWJzQ3NzU3R5bGVyLFxuICAgICAgICBNY0FsaWduVGFic0NlbnRlckNzc1N0eWxlcixcbiAgICAgICAgTWNBbGlnblRhYnNFbmRDc3NTdHlsZXIsXG4gICAgICAgIE1jU3RyZXRjaFRhYnNDc3NTdHlsZXJcbiAgICBdLFxuICAgIGRlY2xhcmF0aW9uczogW1xuICAgICAgICBNY1RhYkdyb3VwLFxuICAgICAgICBNY1RhYkxhYmVsLFxuICAgICAgICBNY1RhYixcbiAgICAgICAgTWNUYWJMYWJlbFdyYXBwZXIsXG4gICAgICAgIE1jVGFiTmF2LFxuICAgICAgICBNY1RhYkxpbmssXG4gICAgICAgIE1jVGFiQm9keSxcbiAgICAgICAgTWNUYWJCb2R5UG9ydGFsLFxuICAgICAgICBNY1RhYkhlYWRlcixcbiAgICAgICAgTWNUYWJDb250ZW50LFxuICAgICAgICBNY0xpZ2h0VGFic0Nzc1N0eWxlcixcbiAgICAgICAgTWNBbGlnblRhYnNDZW50ZXJDc3NTdHlsZXIsXG4gICAgICAgIE1jQWxpZ25UYWJzRW5kQ3NzU3R5bGVyLFxuICAgICAgICBNY1N0cmV0Y2hUYWJzQ3NzU3R5bGVyXG4gICAgXVxufSlcbmV4cG9ydCBjbGFzcyBNY1RhYnNNb2R1bGUge31cbiJdfQ==