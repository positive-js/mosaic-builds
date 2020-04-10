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
var McTabsModule = /** @class */ (function () {
    function McTabsModule() {
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
    return McTabsModule;
}());
export { McTabsModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFicy5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AcHRzZWN1cml0eS9tb3NhaWMvdGFicy8iLCJzb3VyY2VzIjpbInRhYnMubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUNuRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFFekQsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLE9BQU8sQ0FBQztBQUM5QixPQUFPLEVBQUUsU0FBUyxFQUFFLGVBQWUsRUFBRSxNQUFNLFlBQVksQ0FBQztBQUN4RCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzdDLE9BQU8sRUFDSCxVQUFVLEVBQ1Ysb0JBQW9CLEVBQ3BCLDBCQUEwQixFQUMxQix1QkFBdUIsRUFDdkIsc0JBQXNCLEVBQ3pCLE1BQU0sYUFBYSxDQUFDO0FBQ3JCLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFDM0MsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUN6QyxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUN4RCxPQUFPLEVBQUUsU0FBUyxFQUFFLFFBQVEsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBR2hFO0lBQUE7SUFzQzJCLENBQUM7O2dCQXRDM0IsUUFBUSxTQUFDO29CQUNOLE9BQU8sRUFBRTt3QkFDTCxZQUFZO3dCQUNaLGNBQWM7d0JBQ2QsWUFBWTt3QkFDWixVQUFVO3FCQUNiOztvQkFFRCxPQUFPLEVBQUU7d0JBQ0wsY0FBYzt3QkFDZCxVQUFVO3dCQUNWLFVBQVU7d0JBQ1YsS0FBSzt3QkFDTCxRQUFRO3dCQUNSLFNBQVM7d0JBQ1QsWUFBWTt3QkFDWixvQkFBb0I7d0JBQ3BCLDBCQUEwQjt3QkFDMUIsdUJBQXVCO3dCQUN2QixzQkFBc0I7cUJBQ3pCO29CQUNELFlBQVksRUFBRTt3QkFDVixVQUFVO3dCQUNWLFVBQVU7d0JBQ1YsS0FBSzt3QkFDTCxpQkFBaUI7d0JBQ2pCLFFBQVE7d0JBQ1IsU0FBUzt3QkFDVCxTQUFTO3dCQUNULGVBQWU7d0JBQ2YsV0FBVzt3QkFDWCxZQUFZO3dCQUNaLG9CQUFvQjt3QkFDcEIsMEJBQTBCO3dCQUMxQix1QkFBdUI7d0JBQ3ZCLHNCQUFzQjtxQkFDekI7aUJBQ0o7O0lBQzBCLG1CQUFDO0NBQUEsQUF0QzVCLElBc0M0QjtTQUFmLFlBQVkiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBMTF5TW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2ExMXknO1xuaW1wb3J0IHsgUG9ydGFsTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL3BvcnRhbCc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE1jQ29tbW9uTW9kdWxlIH0gZnJvbSAnQHB0c2VjdXJpdHkvbW9zYWljL2NvcmUnO1xuXG5pbXBvcnQgeyBNY1RhYiB9IGZyb20gJy4vdGFiJztcbmltcG9ydCB7IE1jVGFiQm9keSwgTWNUYWJCb2R5UG9ydGFsIH0gZnJvbSAnLi90YWItYm9keSc7XG5pbXBvcnQgeyBNY1RhYkNvbnRlbnQgfSBmcm9tICcuL3RhYi1jb250ZW50JztcbmltcG9ydCB7XG4gICAgTWNUYWJHcm91cCxcbiAgICBNY0xpZ2h0VGFic0Nzc1N0eWxlcixcbiAgICBNY0FsaWduVGFic0NlbnRlckNzc1N0eWxlcixcbiAgICBNY0FsaWduVGFic0VuZENzc1N0eWxlcixcbiAgICBNY1N0cmV0Y2hUYWJzQ3NzU3R5bGVyXG59IGZyb20gJy4vdGFiLWdyb3VwJztcbmltcG9ydCB7IE1jVGFiSGVhZGVyIH0gZnJvbSAnLi90YWItaGVhZGVyJztcbmltcG9ydCB7IE1jVGFiTGFiZWwgfSBmcm9tICcuL3RhYi1sYWJlbCc7XG5pbXBvcnQgeyBNY1RhYkxhYmVsV3JhcHBlciB9IGZyb20gJy4vdGFiLWxhYmVsLXdyYXBwZXInO1xuaW1wb3J0IHsgTWNUYWJMaW5rLCBNY1RhYk5hdiB9IGZyb20gJy4vdGFiLW5hdi1iYXIvdGFiLW5hdi1iYXInO1xuXG5cbkBOZ01vZHVsZSh7XG4gICAgaW1wb3J0czogW1xuICAgICAgICBDb21tb25Nb2R1bGUsXG4gICAgICAgIE1jQ29tbW9uTW9kdWxlLFxuICAgICAgICBQb3J0YWxNb2R1bGUsXG4gICAgICAgIEExMXlNb2R1bGVcbiAgICBdLFxuICAgIC8vIERvbid0IGV4cG9ydCBhbGwgY29tcG9uZW50cyBiZWNhdXNlIHNvbWUgYXJlIG9ubHkgdG8gYmUgdXNlZCBpbnRlcm5hbGx5LlxuICAgIGV4cG9ydHM6IFtcbiAgICAgICAgTWNDb21tb25Nb2R1bGUsXG4gICAgICAgIE1jVGFiR3JvdXAsXG4gICAgICAgIE1jVGFiTGFiZWwsXG4gICAgICAgIE1jVGFiLFxuICAgICAgICBNY1RhYk5hdixcbiAgICAgICAgTWNUYWJMaW5rLFxuICAgICAgICBNY1RhYkNvbnRlbnQsXG4gICAgICAgIE1jTGlnaHRUYWJzQ3NzU3R5bGVyLFxuICAgICAgICBNY0FsaWduVGFic0NlbnRlckNzc1N0eWxlcixcbiAgICAgICAgTWNBbGlnblRhYnNFbmRDc3NTdHlsZXIsXG4gICAgICAgIE1jU3RyZXRjaFRhYnNDc3NTdHlsZXJcbiAgICBdLFxuICAgIGRlY2xhcmF0aW9uczogW1xuICAgICAgICBNY1RhYkdyb3VwLFxuICAgICAgICBNY1RhYkxhYmVsLFxuICAgICAgICBNY1RhYixcbiAgICAgICAgTWNUYWJMYWJlbFdyYXBwZXIsXG4gICAgICAgIE1jVGFiTmF2LFxuICAgICAgICBNY1RhYkxpbmssXG4gICAgICAgIE1jVGFiQm9keSxcbiAgICAgICAgTWNUYWJCb2R5UG9ydGFsLFxuICAgICAgICBNY1RhYkhlYWRlcixcbiAgICAgICAgTWNUYWJDb250ZW50LFxuICAgICAgICBNY0xpZ2h0VGFic0Nzc1N0eWxlcixcbiAgICAgICAgTWNBbGlnblRhYnNDZW50ZXJDc3NTdHlsZXIsXG4gICAgICAgIE1jQWxpZ25UYWJzRW5kQ3NzU3R5bGVyLFxuICAgICAgICBNY1N0cmV0Y2hUYWJzQ3NzU3R5bGVyXG4gICAgXVxufSlcbmV4cG9ydCBjbGFzcyBNY1RhYnNNb2R1bGUge31cbiJdfQ==