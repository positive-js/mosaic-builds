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
export class McModalModule {
}
McModalModule.decorators = [
    { type: NgModule, args: [{
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
                    McModalFooter
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
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kYWwubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcGFja2FnZXMvbW9zYWljL21vZGFsL21vZGFsLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDL0MsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ3JELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUMzRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFFdkQsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQzlDLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQ2hFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ3JELE9BQU8sRUFBRSxXQUFXLEVBQUUsYUFBYSxFQUFFLFlBQVksRUFBRSxpQkFBaUIsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ2hHLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQStCakQsTUFBTSxPQUFPLGFBQWE7OztZQTVCekIsUUFBUSxTQUFDO2dCQUNOLE9BQU8sRUFBRTtvQkFDTCxZQUFZO29CQUNaLGFBQWE7b0JBQ2IsVUFBVTtvQkFDVixjQUFjO29CQUNkLFlBQVk7aUJBQ2Y7Z0JBQ0QsT0FBTyxFQUFFO29CQUNMLGdCQUFnQjtvQkFDaEIsWUFBWTtvQkFDWixXQUFXO29CQUNYLGFBQWE7aUJBQ2hCO2dCQUNELFlBQVksRUFBRTtvQkFDVixnQkFBZ0I7b0JBQ2hCLFlBQVk7b0JBQ1osV0FBVztvQkFDWCxhQUFhO29CQUNiLFdBQVc7b0JBQ1gsaUJBQWlCO2lCQUNwQjtnQkFDRCxTQUFTLEVBQUU7b0JBQ1AscUJBQXFCO29CQUNyQixjQUFjO2lCQUNqQjtnQkFDRCxlQUFlLEVBQUUsQ0FBQyxnQkFBZ0IsQ0FBQzthQUN0QyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEExMXlNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jZGsvYTExeSc7XG5pbXBvcnQgeyBPdmVybGF5TW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL292ZXJsYXknO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBNY0J1dHRvbk1vZHVsZSB9IGZyb20gJ0BwdHNlY3VyaXR5L21vc2FpYy9idXR0b24nO1xuaW1wb3J0IHsgTWNJY29uTW9kdWxlIH0gZnJvbSAnQHB0c2VjdXJpdHkvbW9zYWljL2ljb24nO1xuXG5pbXBvcnQgeyBDc3NVbml0UGlwZSB9IGZyb20gJy4vY3NzLXVuaXQucGlwZSc7XG5pbXBvcnQgeyBNY01vZGFsQ29udHJvbFNlcnZpY2UgfSBmcm9tICcuL21vZGFsLWNvbnRyb2wuc2VydmljZSc7XG5pbXBvcnQgeyBNY01vZGFsQ29tcG9uZW50IH0gZnJvbSAnLi9tb2RhbC5jb21wb25lbnQnO1xuaW1wb3J0IHsgTWNNb2RhbEJvZHksIE1jTW9kYWxGb290ZXIsIE1jTW9kYWxUaXRsZSwgTWNNb2RhbE1haW5BY3Rpb24gfSBmcm9tICcuL21vZGFsLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBNY01vZGFsU2VydmljZSB9IGZyb20gJy4vbW9kYWwuc2VydmljZSc7XG5cblxuQE5nTW9kdWxlKHtcbiAgICBpbXBvcnRzOiBbXG4gICAgICAgIENvbW1vbk1vZHVsZSxcbiAgICAgICAgT3ZlcmxheU1vZHVsZSxcbiAgICAgICAgQTExeU1vZHVsZSxcbiAgICAgICAgTWNCdXR0b25Nb2R1bGUsXG4gICAgICAgIE1jSWNvbk1vZHVsZVxuICAgIF0sXG4gICAgZXhwb3J0czogW1xuICAgICAgICBNY01vZGFsQ29tcG9uZW50LFxuICAgICAgICBNY01vZGFsVGl0bGUsXG4gICAgICAgIE1jTW9kYWxCb2R5LFxuICAgICAgICBNY01vZGFsRm9vdGVyXG4gICAgXSxcbiAgICBkZWNsYXJhdGlvbnM6IFtcbiAgICAgICAgTWNNb2RhbENvbXBvbmVudCxcbiAgICAgICAgTWNNb2RhbFRpdGxlLFxuICAgICAgICBNY01vZGFsQm9keSxcbiAgICAgICAgTWNNb2RhbEZvb3RlcixcbiAgICAgICAgQ3NzVW5pdFBpcGUsXG4gICAgICAgIE1jTW9kYWxNYWluQWN0aW9uXG4gICAgXSxcbiAgICBwcm92aWRlcnM6IFtcbiAgICAgICAgTWNNb2RhbENvbnRyb2xTZXJ2aWNlLFxuICAgICAgICBNY01vZGFsU2VydmljZVxuICAgIF0sXG4gICAgZW50cnlDb21wb25lbnRzOiBbTWNNb2RhbENvbXBvbmVudF1cbn0pXG5leHBvcnQgY2xhc3MgTWNNb2RhbE1vZHVsZSB7fVxuIl19