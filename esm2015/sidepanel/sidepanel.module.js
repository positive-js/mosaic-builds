/**
 * @fileoverview added by tsickle
 * Generated from: sidepanel.module.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { McCommonModule } from '@ptsecurity/mosaic/core';
import { McIconModule } from '@ptsecurity/mosaic/icon';
import { McSidepanelContainerComponent } from './sidepanel-container.component';
import { McSidepanelActions, McSidepanelBody, McSidepanelClose, McSidepanelFooter, McSidepanelHeader } from './sidepanel-directives';
import { McSidepanelService } from './sidepanel.service';
export class McSidepanelModule {
}
McSidepanelModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    OverlayModule,
                    PortalModule,
                    McCommonModule,
                    McIconModule
                ],
                providers: [McSidepanelService],
                declarations: [
                    McSidepanelContainerComponent,
                    McSidepanelClose,
                    McSidepanelHeader,
                    McSidepanelBody,
                    McSidepanelFooter,
                    McSidepanelActions
                ],
                entryComponents: [McSidepanelContainerComponent],
                exports: [
                    McSidepanelContainerComponent,
                    McSidepanelClose,
                    McSidepanelHeader,
                    McSidepanelBody,
                    McSidepanelFooter,
                    McSidepanelActions
                ]
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lkZXBhbmVsLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIvaG9tZS9jaXJjbGVjaS9tb3NhaWMvcGFja2FnZXMvbW9zYWljL3NpZGVwYW5lbC8iLCJzb3VyY2VzIjpbInNpZGVwYW5lbC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDckQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ25ELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUN6RCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFFdkQsT0FBTyxFQUFFLDZCQUE2QixFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFDaEYsT0FBTyxFQUNILGtCQUFrQixFQUNsQixlQUFlLEVBQ2YsZ0JBQWdCLEVBQ2hCLGlCQUFpQixFQUNqQixpQkFBaUIsRUFDcEIsTUFBTSx3QkFBd0IsQ0FBQztBQUNoQyxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQThCekQsTUFBTSxPQUFPLGlCQUFpQjs7O1lBM0I3QixRQUFRLFNBQUM7Z0JBQ04sT0FBTyxFQUFFO29CQUNMLFlBQVk7b0JBQ1osYUFBYTtvQkFDYixZQUFZO29CQUNaLGNBQWM7b0JBQ2QsWUFBWTtpQkFDZjtnQkFDRCxTQUFTLEVBQUUsQ0FBQyxrQkFBa0IsQ0FBQztnQkFDL0IsWUFBWSxFQUFFO29CQUNWLDZCQUE2QjtvQkFDN0IsZ0JBQWdCO29CQUNoQixpQkFBaUI7b0JBQ2pCLGVBQWU7b0JBQ2YsaUJBQWlCO29CQUNqQixrQkFBa0I7aUJBQ3JCO2dCQUNELGVBQWUsRUFBRSxDQUFDLDZCQUE2QixDQUFDO2dCQUNoRCxPQUFPLEVBQUU7b0JBQ0wsNkJBQTZCO29CQUM3QixnQkFBZ0I7b0JBQ2hCLGlCQUFpQjtvQkFDakIsZUFBZTtvQkFDZixpQkFBaUI7b0JBQ2pCLGtCQUFrQjtpQkFDckI7YUFDSiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE92ZXJsYXlNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jZGsvb3ZlcmxheSc7XG5pbXBvcnQgeyBQb3J0YWxNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jZGsvcG9ydGFsJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTWNDb21tb25Nb2R1bGUgfSBmcm9tICdAcHRzZWN1cml0eS9tb3NhaWMvY29yZSc7XG5pbXBvcnQgeyBNY0ljb25Nb2R1bGUgfSBmcm9tICdAcHRzZWN1cml0eS9tb3NhaWMvaWNvbic7XG5cbmltcG9ydCB7IE1jU2lkZXBhbmVsQ29udGFpbmVyQ29tcG9uZW50IH0gZnJvbSAnLi9zaWRlcGFuZWwtY29udGFpbmVyLmNvbXBvbmVudCc7XG5pbXBvcnQge1xuICAgIE1jU2lkZXBhbmVsQWN0aW9ucyxcbiAgICBNY1NpZGVwYW5lbEJvZHksXG4gICAgTWNTaWRlcGFuZWxDbG9zZSxcbiAgICBNY1NpZGVwYW5lbEZvb3RlcixcbiAgICBNY1NpZGVwYW5lbEhlYWRlclxufSBmcm9tICcuL3NpZGVwYW5lbC1kaXJlY3RpdmVzJztcbmltcG9ydCB7IE1jU2lkZXBhbmVsU2VydmljZSB9IGZyb20gJy4vc2lkZXBhbmVsLnNlcnZpY2UnO1xuXG5cbkBOZ01vZHVsZSh7XG4gICAgaW1wb3J0czogW1xuICAgICAgICBDb21tb25Nb2R1bGUsXG4gICAgICAgIE92ZXJsYXlNb2R1bGUsXG4gICAgICAgIFBvcnRhbE1vZHVsZSxcbiAgICAgICAgTWNDb21tb25Nb2R1bGUsXG4gICAgICAgIE1jSWNvbk1vZHVsZVxuICAgIF0sXG4gICAgcHJvdmlkZXJzOiBbTWNTaWRlcGFuZWxTZXJ2aWNlXSxcbiAgICBkZWNsYXJhdGlvbnM6IFtcbiAgICAgICAgTWNTaWRlcGFuZWxDb250YWluZXJDb21wb25lbnQsXG4gICAgICAgIE1jU2lkZXBhbmVsQ2xvc2UsXG4gICAgICAgIE1jU2lkZXBhbmVsSGVhZGVyLFxuICAgICAgICBNY1NpZGVwYW5lbEJvZHksXG4gICAgICAgIE1jU2lkZXBhbmVsRm9vdGVyLFxuICAgICAgICBNY1NpZGVwYW5lbEFjdGlvbnNcbiAgICBdLFxuICAgIGVudHJ5Q29tcG9uZW50czogW01jU2lkZXBhbmVsQ29udGFpbmVyQ29tcG9uZW50XSxcbiAgICBleHBvcnRzOiBbXG4gICAgICAgIE1jU2lkZXBhbmVsQ29udGFpbmVyQ29tcG9uZW50LFxuICAgICAgICBNY1NpZGVwYW5lbENsb3NlLFxuICAgICAgICBNY1NpZGVwYW5lbEhlYWRlcixcbiAgICAgICAgTWNTaWRlcGFuZWxCb2R5LFxuICAgICAgICBNY1NpZGVwYW5lbEZvb3RlcixcbiAgICAgICAgTWNTaWRlcGFuZWxBY3Rpb25zXG4gICAgXVxufSlcbmV4cG9ydCBjbGFzcyBNY1NpZGVwYW5lbE1vZHVsZSB7fVxuIl19