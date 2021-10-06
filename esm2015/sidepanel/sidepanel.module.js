import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { McButtonModule } from '@ptsecurity/mosaic/button';
import { McCommonModule } from '@ptsecurity/mosaic/core';
import { McIconModule } from '@ptsecurity/mosaic/icon';
import { McSidepanelContainerComponent } from './sidepanel-container.component';
import { McSidepanelActions, McSidepanelBody, McSidepanelClose, McSidepanelFooter, McSidepanelHeader } from './sidepanel-directives';
import { McSidepanelService } from './sidepanel.service';
import * as i0 from "@angular/core";
export class McSidepanelModule {
}
/** @nocollapse */ McSidepanelModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0, type: McSidepanelModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
/** @nocollapse */ McSidepanelModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0, type: McSidepanelModule, declarations: [McSidepanelContainerComponent,
        McSidepanelClose,
        McSidepanelHeader,
        McSidepanelBody,
        McSidepanelFooter,
        McSidepanelActions], imports: [CommonModule,
        OverlayModule,
        PortalModule,
        McCommonModule,
        McButtonModule,
        McIconModule], exports: [McSidepanelContainerComponent,
        McSidepanelClose,
        McSidepanelHeader,
        McSidepanelBody,
        McSidepanelFooter,
        McSidepanelActions] });
/** @nocollapse */ McSidepanelModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0, type: McSidepanelModule, providers: [McSidepanelService], imports: [[
            CommonModule,
            OverlayModule,
            PortalModule,
            McCommonModule,
            McButtonModule,
            McIconModule
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0, type: McSidepanelModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        OverlayModule,
                        PortalModule,
                        McCommonModule,
                        McButtonModule,
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
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lkZXBhbmVsLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3BhY2thZ2VzL21vc2FpYy9zaWRlcGFuZWwvc2lkZXBhbmVsLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDckQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ25ELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUMzRCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDekQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBRXZELE9BQU8sRUFBRSw2QkFBNkIsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBQ2hGLE9BQU8sRUFDSCxrQkFBa0IsRUFDbEIsZUFBZSxFQUNmLGdCQUFnQixFQUNoQixpQkFBaUIsRUFDakIsaUJBQWlCLEVBQ3BCLE1BQU0sd0JBQXdCLENBQUM7QUFDaEMsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0scUJBQXFCLENBQUM7O0FBK0J6RCxNQUFNLE9BQU8saUJBQWlCOztpSUFBakIsaUJBQWlCO2tJQUFqQixpQkFBaUIsaUJBakJ0Qiw2QkFBNkI7UUFDN0IsZ0JBQWdCO1FBQ2hCLGlCQUFpQjtRQUNqQixlQUFlO1FBQ2YsaUJBQWlCO1FBQ2pCLGtCQUFrQixhQWRsQixZQUFZO1FBQ1osYUFBYTtRQUNiLFlBQVk7UUFDWixjQUFjO1FBQ2QsY0FBYztRQUNkLFlBQVksYUFhWiw2QkFBNkI7UUFDN0IsZ0JBQWdCO1FBQ2hCLGlCQUFpQjtRQUNqQixlQUFlO1FBQ2YsaUJBQWlCO1FBQ2pCLGtCQUFrQjtrSUFHYixpQkFBaUIsYUFuQmYsQ0FBQyxrQkFBa0IsQ0FBQyxZQVJ0QjtZQUNMLFlBQVk7WUFDWixhQUFhO1lBQ2IsWUFBWTtZQUNaLGNBQWM7WUFDZCxjQUFjO1lBQ2QsWUFBWTtTQUNmOzJGQW9CUSxpQkFBaUI7a0JBNUI3QixRQUFRO21CQUFDO29CQUNOLE9BQU8sRUFBRTt3QkFDTCxZQUFZO3dCQUNaLGFBQWE7d0JBQ2IsWUFBWTt3QkFDWixjQUFjO3dCQUNkLGNBQWM7d0JBQ2QsWUFBWTtxQkFDZjtvQkFDRCxTQUFTLEVBQUUsQ0FBQyxrQkFBa0IsQ0FBQztvQkFDL0IsWUFBWSxFQUFFO3dCQUNWLDZCQUE2Qjt3QkFDN0IsZ0JBQWdCO3dCQUNoQixpQkFBaUI7d0JBQ2pCLGVBQWU7d0JBQ2YsaUJBQWlCO3dCQUNqQixrQkFBa0I7cUJBQ3JCO29CQUNELGVBQWUsRUFBRSxDQUFDLDZCQUE2QixDQUFDO29CQUNoRCxPQUFPLEVBQUU7d0JBQ0wsNkJBQTZCO3dCQUM3QixnQkFBZ0I7d0JBQ2hCLGlCQUFpQjt3QkFDakIsZUFBZTt3QkFDZixpQkFBaUI7d0JBQ2pCLGtCQUFrQjtxQkFDckI7aUJBQ0oiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBPdmVybGF5TW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL292ZXJsYXknO1xuaW1wb3J0IHsgUG9ydGFsTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL3BvcnRhbCc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE1jQnV0dG9uTW9kdWxlIH0gZnJvbSAnQHB0c2VjdXJpdHkvbW9zYWljL2J1dHRvbic7XG5pbXBvcnQgeyBNY0NvbW1vbk1vZHVsZSB9IGZyb20gJ0BwdHNlY3VyaXR5L21vc2FpYy9jb3JlJztcbmltcG9ydCB7IE1jSWNvbk1vZHVsZSB9IGZyb20gJ0BwdHNlY3VyaXR5L21vc2FpYy9pY29uJztcblxuaW1wb3J0IHsgTWNTaWRlcGFuZWxDb250YWluZXJDb21wb25lbnQgfSBmcm9tICcuL3NpZGVwYW5lbC1jb250YWluZXIuY29tcG9uZW50JztcbmltcG9ydCB7XG4gICAgTWNTaWRlcGFuZWxBY3Rpb25zLFxuICAgIE1jU2lkZXBhbmVsQm9keSxcbiAgICBNY1NpZGVwYW5lbENsb3NlLFxuICAgIE1jU2lkZXBhbmVsRm9vdGVyLFxuICAgIE1jU2lkZXBhbmVsSGVhZGVyXG59IGZyb20gJy4vc2lkZXBhbmVsLWRpcmVjdGl2ZXMnO1xuaW1wb3J0IHsgTWNTaWRlcGFuZWxTZXJ2aWNlIH0gZnJvbSAnLi9zaWRlcGFuZWwuc2VydmljZSc7XG5cblxuQE5nTW9kdWxlKHtcbiAgICBpbXBvcnRzOiBbXG4gICAgICAgIENvbW1vbk1vZHVsZSxcbiAgICAgICAgT3ZlcmxheU1vZHVsZSxcbiAgICAgICAgUG9ydGFsTW9kdWxlLFxuICAgICAgICBNY0NvbW1vbk1vZHVsZSxcbiAgICAgICAgTWNCdXR0b25Nb2R1bGUsXG4gICAgICAgIE1jSWNvbk1vZHVsZVxuICAgIF0sXG4gICAgcHJvdmlkZXJzOiBbTWNTaWRlcGFuZWxTZXJ2aWNlXSxcbiAgICBkZWNsYXJhdGlvbnM6IFtcbiAgICAgICAgTWNTaWRlcGFuZWxDb250YWluZXJDb21wb25lbnQsXG4gICAgICAgIE1jU2lkZXBhbmVsQ2xvc2UsXG4gICAgICAgIE1jU2lkZXBhbmVsSGVhZGVyLFxuICAgICAgICBNY1NpZGVwYW5lbEJvZHksXG4gICAgICAgIE1jU2lkZXBhbmVsRm9vdGVyLFxuICAgICAgICBNY1NpZGVwYW5lbEFjdGlvbnNcbiAgICBdLFxuICAgIGVudHJ5Q29tcG9uZW50czogW01jU2lkZXBhbmVsQ29udGFpbmVyQ29tcG9uZW50XSxcbiAgICBleHBvcnRzOiBbXG4gICAgICAgIE1jU2lkZXBhbmVsQ29udGFpbmVyQ29tcG9uZW50LFxuICAgICAgICBNY1NpZGVwYW5lbENsb3NlLFxuICAgICAgICBNY1NpZGVwYW5lbEhlYWRlcixcbiAgICAgICAgTWNTaWRlcGFuZWxCb2R5LFxuICAgICAgICBNY1NpZGVwYW5lbEZvb3RlcixcbiAgICAgICAgTWNTaWRlcGFuZWxBY3Rpb25zXG4gICAgXVxufSlcbmV4cG9ydCBjbGFzcyBNY1NpZGVwYW5lbE1vZHVsZSB7fVxuIl19