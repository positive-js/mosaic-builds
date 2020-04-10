/**
 * @fileoverview added by tsickle
 * Generated from: sidepanel.module.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lkZXBhbmVsLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BwdHNlY3VyaXR5L21vc2FpYy9zaWRlcGFuZWwvIiwic291cmNlcyI6WyJzaWRlcGFuZWwubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ3JELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUNuRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDekQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBRXZELE9BQU8sRUFBRSw2QkFBNkIsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBQ2hGLE9BQU8sRUFDSCxrQkFBa0IsRUFDbEIsZUFBZSxFQUNmLGdCQUFnQixFQUNoQixpQkFBaUIsRUFDakIsaUJBQWlCLEVBQ3BCLE1BQU0sd0JBQXdCLENBQUM7QUFDaEMsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0scUJBQXFCLENBQUM7QUE4QnpELE1BQU0sT0FBTyxpQkFBaUI7OztZQTNCN0IsUUFBUSxTQUFDO2dCQUNOLE9BQU8sRUFBRTtvQkFDTCxZQUFZO29CQUNaLGFBQWE7b0JBQ2IsWUFBWTtvQkFDWixjQUFjO29CQUNkLFlBQVk7aUJBQ2Y7Z0JBQ0QsU0FBUyxFQUFFLENBQUMsa0JBQWtCLENBQUM7Z0JBQy9CLFlBQVksRUFBRTtvQkFDViw2QkFBNkI7b0JBQzdCLGdCQUFnQjtvQkFDaEIsaUJBQWlCO29CQUNqQixlQUFlO29CQUNmLGlCQUFpQjtvQkFDakIsa0JBQWtCO2lCQUNyQjtnQkFDRCxlQUFlLEVBQUUsQ0FBQyw2QkFBNkIsQ0FBQztnQkFDaEQsT0FBTyxFQUFFO29CQUNMLDZCQUE2QjtvQkFDN0IsZ0JBQWdCO29CQUNoQixpQkFBaUI7b0JBQ2pCLGVBQWU7b0JBQ2YsaUJBQWlCO29CQUNqQixrQkFBa0I7aUJBQ3JCO2FBQ0oiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBPdmVybGF5TW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL292ZXJsYXknO1xuaW1wb3J0IHsgUG9ydGFsTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL3BvcnRhbCc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE1jQ29tbW9uTW9kdWxlIH0gZnJvbSAnQHB0c2VjdXJpdHkvbW9zYWljL2NvcmUnO1xuaW1wb3J0IHsgTWNJY29uTW9kdWxlIH0gZnJvbSAnQHB0c2VjdXJpdHkvbW9zYWljL2ljb24nO1xuXG5pbXBvcnQgeyBNY1NpZGVwYW5lbENvbnRhaW5lckNvbXBvbmVudCB9IGZyb20gJy4vc2lkZXBhbmVsLWNvbnRhaW5lci5jb21wb25lbnQnO1xuaW1wb3J0IHtcbiAgICBNY1NpZGVwYW5lbEFjdGlvbnMsXG4gICAgTWNTaWRlcGFuZWxCb2R5LFxuICAgIE1jU2lkZXBhbmVsQ2xvc2UsXG4gICAgTWNTaWRlcGFuZWxGb290ZXIsXG4gICAgTWNTaWRlcGFuZWxIZWFkZXJcbn0gZnJvbSAnLi9zaWRlcGFuZWwtZGlyZWN0aXZlcyc7XG5pbXBvcnQgeyBNY1NpZGVwYW5lbFNlcnZpY2UgfSBmcm9tICcuL3NpZGVwYW5lbC5zZXJ2aWNlJztcblxuXG5ATmdNb2R1bGUoe1xuICAgIGltcG9ydHM6IFtcbiAgICAgICAgQ29tbW9uTW9kdWxlLFxuICAgICAgICBPdmVybGF5TW9kdWxlLFxuICAgICAgICBQb3J0YWxNb2R1bGUsXG4gICAgICAgIE1jQ29tbW9uTW9kdWxlLFxuICAgICAgICBNY0ljb25Nb2R1bGVcbiAgICBdLFxuICAgIHByb3ZpZGVyczogW01jU2lkZXBhbmVsU2VydmljZV0sXG4gICAgZGVjbGFyYXRpb25zOiBbXG4gICAgICAgIE1jU2lkZXBhbmVsQ29udGFpbmVyQ29tcG9uZW50LFxuICAgICAgICBNY1NpZGVwYW5lbENsb3NlLFxuICAgICAgICBNY1NpZGVwYW5lbEhlYWRlcixcbiAgICAgICAgTWNTaWRlcGFuZWxCb2R5LFxuICAgICAgICBNY1NpZGVwYW5lbEZvb3RlcixcbiAgICAgICAgTWNTaWRlcGFuZWxBY3Rpb25zXG4gICAgXSxcbiAgICBlbnRyeUNvbXBvbmVudHM6IFtNY1NpZGVwYW5lbENvbnRhaW5lckNvbXBvbmVudF0sXG4gICAgZXhwb3J0czogW1xuICAgICAgICBNY1NpZGVwYW5lbENvbnRhaW5lckNvbXBvbmVudCxcbiAgICAgICAgTWNTaWRlcGFuZWxDbG9zZSxcbiAgICAgICAgTWNTaWRlcGFuZWxIZWFkZXIsXG4gICAgICAgIE1jU2lkZXBhbmVsQm9keSxcbiAgICAgICAgTWNTaWRlcGFuZWxGb290ZXIsXG4gICAgICAgIE1jU2lkZXBhbmVsQWN0aW9uc1xuICAgIF1cbn0pXG5leHBvcnQgY2xhc3MgTWNTaWRlcGFuZWxNb2R1bGUge31cbiJdfQ==