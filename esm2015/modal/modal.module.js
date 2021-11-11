import { A11yModule } from '@angular/cdk/a11y';
import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { McButtonModule } from '@ptsecurity/mosaic/button';
import { McIconModule } from '@ptsecurity/mosaic/icon';
import { CssUnitPipe } from './css-unit.pipe';
import { McModalControlService } from './modal-control.service';
import { McModalComponent } from './modal.component';
import { McModalBody, McModalFooter, McModalTitle, McModalMainAction } from './modal.directive';
import { McModalService } from './modal.service';
import * as i0 from "@angular/core";
export class McModalModule {
}
/** @nocollapse */ McModalModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0, type: McModalModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
/** @nocollapse */ McModalModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0, type: McModalModule, declarations: [McModalComponent,
        McModalTitle,
        McModalBody,
        McModalFooter,
        CssUnitPipe,
        McModalMainAction], imports: [CommonModule,
        OverlayModule,
        A11yModule,
        McButtonModule,
        McIconModule], exports: [McModalComponent,
        McModalTitle,
        McModalBody,
        McModalFooter,
        McModalMainAction] });
/** @nocollapse */ McModalModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0, type: McModalModule, providers: [
        McModalControlService,
        McModalService
    ], imports: [[
            CommonModule,
            OverlayModule,
            A11yModule,
            McButtonModule,
            McIconModule
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.5", ngImport: i0, type: McModalModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        OverlayModule,
                        A11yModule,
                        McButtonModule,
                        McIconModule
                    ],
                    exports: [
                        McModalComponent,
                        McModalTitle,
                        McModalBody,
                        McModalFooter,
                        McModalMainAction
                    ],
                    declarations: [
                        McModalComponent,
                        McModalTitle,
                        McModalBody,
                        McModalFooter,
                        CssUnitPipe,
                        McModalMainAction
                    ],
                    providers: [
                        McModalControlService,
                        McModalService
                    ],
                    entryComponents: [McModalComponent]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kYWwubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcGFja2FnZXMvbW9zYWljL21vZGFsL21vZGFsLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDL0MsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ3JELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUMzRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFFdkQsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQzlDLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQ2hFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ3JELE9BQU8sRUFBRSxXQUFXLEVBQUUsYUFBYSxFQUFFLFlBQVksRUFBRSxpQkFBaUIsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ2hHLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQzs7QUFnQ2pELE1BQU0sT0FBTyxhQUFhOzs2SEFBYixhQUFhOzhIQUFiLGFBQWEsaUJBYmxCLGdCQUFnQjtRQUNoQixZQUFZO1FBQ1osV0FBVztRQUNYLGFBQWE7UUFDYixXQUFXO1FBQ1gsaUJBQWlCLGFBbkJqQixZQUFZO1FBQ1osYUFBYTtRQUNiLFVBQVU7UUFDVixjQUFjO1FBQ2QsWUFBWSxhQUdaLGdCQUFnQjtRQUNoQixZQUFZO1FBQ1osV0FBVztRQUNYLGFBQWE7UUFDYixpQkFBaUI7OEhBZ0JaLGFBQWEsYUFOWDtRQUNQLHFCQUFxQjtRQUNyQixjQUFjO0tBQ2pCLFlBekJRO1lBQ0wsWUFBWTtZQUNaLGFBQWE7WUFDYixVQUFVO1lBQ1YsY0FBYztZQUNkLFlBQVk7U0FDZjsyRkFzQlEsYUFBYTtrQkE3QnpCLFFBQVE7bUJBQUM7b0JBQ04sT0FBTyxFQUFFO3dCQUNMLFlBQVk7d0JBQ1osYUFBYTt3QkFDYixVQUFVO3dCQUNWLGNBQWM7d0JBQ2QsWUFBWTtxQkFDZjtvQkFDRCxPQUFPLEVBQUU7d0JBQ0wsZ0JBQWdCO3dCQUNoQixZQUFZO3dCQUNaLFdBQVc7d0JBQ1gsYUFBYTt3QkFDYixpQkFBaUI7cUJBQ3BCO29CQUNELFlBQVksRUFBRTt3QkFDVixnQkFBZ0I7d0JBQ2hCLFlBQVk7d0JBQ1osV0FBVzt3QkFDWCxhQUFhO3dCQUNiLFdBQVc7d0JBQ1gsaUJBQWlCO3FCQUNwQjtvQkFDRCxTQUFTLEVBQUU7d0JBQ1AscUJBQXFCO3dCQUNyQixjQUFjO3FCQUNqQjtvQkFDRCxlQUFlLEVBQUUsQ0FBQyxnQkFBZ0IsQ0FBQztpQkFDdEMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBMTF5TW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2ExMXknO1xuaW1wb3J0IHsgT3ZlcmxheU1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9vdmVybGF5JztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTWNCdXR0b25Nb2R1bGUgfSBmcm9tICdAcHRzZWN1cml0eS9tb3NhaWMvYnV0dG9uJztcbmltcG9ydCB7IE1jSWNvbk1vZHVsZSB9IGZyb20gJ0BwdHNlY3VyaXR5L21vc2FpYy9pY29uJztcblxuaW1wb3J0IHsgQ3NzVW5pdFBpcGUgfSBmcm9tICcuL2Nzcy11bml0LnBpcGUnO1xuaW1wb3J0IHsgTWNNb2RhbENvbnRyb2xTZXJ2aWNlIH0gZnJvbSAnLi9tb2RhbC1jb250cm9sLnNlcnZpY2UnO1xuaW1wb3J0IHsgTWNNb2RhbENvbXBvbmVudCB9IGZyb20gJy4vbW9kYWwuY29tcG9uZW50JztcbmltcG9ydCB7IE1jTW9kYWxCb2R5LCBNY01vZGFsRm9vdGVyLCBNY01vZGFsVGl0bGUsIE1jTW9kYWxNYWluQWN0aW9uIH0gZnJvbSAnLi9tb2RhbC5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgTWNNb2RhbFNlcnZpY2UgfSBmcm9tICcuL21vZGFsLnNlcnZpY2UnO1xuXG5cbkBOZ01vZHVsZSh7XG4gICAgaW1wb3J0czogW1xuICAgICAgICBDb21tb25Nb2R1bGUsXG4gICAgICAgIE92ZXJsYXlNb2R1bGUsXG4gICAgICAgIEExMXlNb2R1bGUsXG4gICAgICAgIE1jQnV0dG9uTW9kdWxlLFxuICAgICAgICBNY0ljb25Nb2R1bGVcbiAgICBdLFxuICAgIGV4cG9ydHM6IFtcbiAgICAgICAgTWNNb2RhbENvbXBvbmVudCxcbiAgICAgICAgTWNNb2RhbFRpdGxlLFxuICAgICAgICBNY01vZGFsQm9keSxcbiAgICAgICAgTWNNb2RhbEZvb3RlcixcbiAgICAgICAgTWNNb2RhbE1haW5BY3Rpb25cbiAgICBdLFxuICAgIGRlY2xhcmF0aW9uczogW1xuICAgICAgICBNY01vZGFsQ29tcG9uZW50LFxuICAgICAgICBNY01vZGFsVGl0bGUsXG4gICAgICAgIE1jTW9kYWxCb2R5LFxuICAgICAgICBNY01vZGFsRm9vdGVyLFxuICAgICAgICBDc3NVbml0UGlwZSxcbiAgICAgICAgTWNNb2RhbE1haW5BY3Rpb25cbiAgICBdLFxuICAgIHByb3ZpZGVyczogW1xuICAgICAgICBNY01vZGFsQ29udHJvbFNlcnZpY2UsXG4gICAgICAgIE1jTW9kYWxTZXJ2aWNlXG4gICAgXSxcbiAgICBlbnRyeUNvbXBvbmVudHM6IFtNY01vZGFsQ29tcG9uZW50XVxufSlcbmV4cG9ydCBjbGFzcyBNY01vZGFsTW9kdWxlIHt9XG4iXX0=