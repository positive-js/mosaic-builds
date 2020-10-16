/**
 * @fileoverview added by tsickle
 * Generated from: modal.module.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { A11yModule } from '@angular/cdk/a11y';
import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { McButtonModule } from '@ptsecurity/mosaic/button';
import { McIconModule } from '@ptsecurity/mosaic/icon';
import { CssUnitPipe } from './css-unit.pipe';
import { McModalControlService } from './modal-control.service';
import { McModalComponent } from './modal.component';
import { McModalBody, McModalFooter, McModalTitle } from './modal.directive';
import { McModalService } from './modal.service';
export class McModalModule {
}
McModalModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule, OverlayModule, A11yModule, McButtonModule, McIconModule],
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
                    CssUnitPipe
                ],
                entryComponents: [McModalComponent],
                providers: [McModalControlService, McModalService]
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kYWwubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Ii9ob21lL2NpcmNsZWNpL21vc2FpYy9wYWNrYWdlcy9tb3NhaWMvbW9kYWwvIiwic291cmNlcyI6WyJtb2RhbC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDL0MsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ3JELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUMzRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFFdkQsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQzlDLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQ2hFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ3JELE9BQU8sRUFBRSxXQUFXLEVBQUUsYUFBYSxFQUFFLFlBQVksRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQzdFLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQXFCakQsTUFBTSxPQUFPLGFBQWE7OztZQWxCekIsUUFBUSxTQUFDO2dCQUNOLE9BQU8sRUFBRSxDQUFDLFlBQVksRUFBRSxhQUFhLEVBQUUsVUFBVSxFQUFFLGNBQWMsRUFBRSxZQUFZLENBQUM7Z0JBQ2hGLE9BQU8sRUFBRTtvQkFDTCxnQkFBZ0I7b0JBQ2hCLFlBQVk7b0JBQ1osV0FBVztvQkFDWCxhQUFhO2lCQUNoQjtnQkFDRCxZQUFZLEVBQUU7b0JBQ1YsZ0JBQWdCO29CQUNoQixZQUFZO29CQUNaLFdBQVc7b0JBQ1gsYUFBYTtvQkFDYixXQUFXO2lCQUNkO2dCQUNELGVBQWUsRUFBRSxDQUFDLGdCQUFnQixDQUFDO2dCQUNuQyxTQUFTLEVBQUUsQ0FBQyxxQkFBcUIsRUFBRSxjQUFjLENBQUM7YUFDckQiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBMTF5TW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2ExMXknO1xuaW1wb3J0IHsgT3ZlcmxheU1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9vdmVybGF5JztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTWNCdXR0b25Nb2R1bGUgfSBmcm9tICdAcHRzZWN1cml0eS9tb3NhaWMvYnV0dG9uJztcbmltcG9ydCB7IE1jSWNvbk1vZHVsZSB9IGZyb20gJ0BwdHNlY3VyaXR5L21vc2FpYy9pY29uJztcblxuaW1wb3J0IHsgQ3NzVW5pdFBpcGUgfSBmcm9tICcuL2Nzcy11bml0LnBpcGUnO1xuaW1wb3J0IHsgTWNNb2RhbENvbnRyb2xTZXJ2aWNlIH0gZnJvbSAnLi9tb2RhbC1jb250cm9sLnNlcnZpY2UnO1xuaW1wb3J0IHsgTWNNb2RhbENvbXBvbmVudCB9IGZyb20gJy4vbW9kYWwuY29tcG9uZW50JztcbmltcG9ydCB7IE1jTW9kYWxCb2R5LCBNY01vZGFsRm9vdGVyLCBNY01vZGFsVGl0bGUgfSBmcm9tICcuL21vZGFsLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBNY01vZGFsU2VydmljZSB9IGZyb20gJy4vbW9kYWwuc2VydmljZSc7XG5cblxuQE5nTW9kdWxlKHtcbiAgICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlLCBPdmVybGF5TW9kdWxlLCBBMTF5TW9kdWxlLCBNY0J1dHRvbk1vZHVsZSwgTWNJY29uTW9kdWxlXSxcbiAgICBleHBvcnRzOiBbXG4gICAgICAgIE1jTW9kYWxDb21wb25lbnQsXG4gICAgICAgIE1jTW9kYWxUaXRsZSxcbiAgICAgICAgTWNNb2RhbEJvZHksXG4gICAgICAgIE1jTW9kYWxGb290ZXJcbiAgICBdLFxuICAgIGRlY2xhcmF0aW9uczogW1xuICAgICAgICBNY01vZGFsQ29tcG9uZW50LFxuICAgICAgICBNY01vZGFsVGl0bGUsXG4gICAgICAgIE1jTW9kYWxCb2R5LFxuICAgICAgICBNY01vZGFsRm9vdGVyLFxuICAgICAgICBDc3NVbml0UGlwZVxuICAgIF0sXG4gICAgZW50cnlDb21wb25lbnRzOiBbTWNNb2RhbENvbXBvbmVudF0sXG4gICAgcHJvdmlkZXJzOiBbTWNNb2RhbENvbnRyb2xTZXJ2aWNlLCBNY01vZGFsU2VydmljZV1cbn0pXG5leHBvcnQgY2xhc3MgTWNNb2RhbE1vZHVsZSB7fVxuIl19