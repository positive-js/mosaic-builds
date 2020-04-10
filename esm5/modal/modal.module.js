/**
 * @fileoverview added by tsickle
 * Generated from: modal.module.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
var McModalModule = /** @class */ (function () {
    function McModalModule() {
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
    return McModalModule;
}());
export { McModalModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kYWwubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHB0c2VjdXJpdHkvbW9zYWljL21vZGFsLyIsInNvdXJjZXMiOlsibW9kYWwubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUNyRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDM0QsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBRXZELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUM5QyxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUNoRSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUNyRCxPQUFPLEVBQUUsV0FBVyxFQUFFLGFBQWEsRUFBRSxZQUFZLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUM3RSxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFHakQ7SUFBQTtJQWtCNEIsQ0FBQzs7Z0JBbEI1QixRQUFRLFNBQUM7b0JBQ04sT0FBTyxFQUFFLENBQUMsWUFBWSxFQUFFLGFBQWEsRUFBRSxVQUFVLEVBQUUsY0FBYyxFQUFFLFlBQVksQ0FBQztvQkFDaEYsT0FBTyxFQUFFO3dCQUNMLGdCQUFnQjt3QkFDaEIsWUFBWTt3QkFDWixXQUFXO3dCQUNYLGFBQWE7cUJBQ2hCO29CQUNELFlBQVksRUFBRTt3QkFDVixnQkFBZ0I7d0JBQ2hCLFlBQVk7d0JBQ1osV0FBVzt3QkFDWCxhQUFhO3dCQUNiLFdBQVc7cUJBQ2Q7b0JBQ0QsZUFBZSxFQUFFLENBQUMsZ0JBQWdCLENBQUM7b0JBQ25DLFNBQVMsRUFBRSxDQUFDLHFCQUFxQixFQUFFLGNBQWMsQ0FBQztpQkFDckQ7O0lBQzJCLG9CQUFDO0NBQUEsQUFsQjdCLElBa0I2QjtTQUFoQixhQUFhIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQTExeU1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9hMTF5JztcbmltcG9ydCB7IE92ZXJsYXlNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jZGsvb3ZlcmxheSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE1jQnV0dG9uTW9kdWxlIH0gZnJvbSAnQHB0c2VjdXJpdHkvbW9zYWljL2J1dHRvbic7XG5pbXBvcnQgeyBNY0ljb25Nb2R1bGUgfSBmcm9tICdAcHRzZWN1cml0eS9tb3NhaWMvaWNvbic7XG5cbmltcG9ydCB7IENzc1VuaXRQaXBlIH0gZnJvbSAnLi9jc3MtdW5pdC5waXBlJztcbmltcG9ydCB7IE1jTW9kYWxDb250cm9sU2VydmljZSB9IGZyb20gJy4vbW9kYWwtY29udHJvbC5zZXJ2aWNlJztcbmltcG9ydCB7IE1jTW9kYWxDb21wb25lbnQgfSBmcm9tICcuL21vZGFsLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBNY01vZGFsQm9keSwgTWNNb2RhbEZvb3RlciwgTWNNb2RhbFRpdGxlIH0gZnJvbSAnLi9tb2RhbC5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgTWNNb2RhbFNlcnZpY2UgfSBmcm9tICcuL21vZGFsLnNlcnZpY2UnO1xuXG5cbkBOZ01vZHVsZSh7XG4gICAgaW1wb3J0czogW0NvbW1vbk1vZHVsZSwgT3ZlcmxheU1vZHVsZSwgQTExeU1vZHVsZSwgTWNCdXR0b25Nb2R1bGUsIE1jSWNvbk1vZHVsZV0sXG4gICAgZXhwb3J0czogW1xuICAgICAgICBNY01vZGFsQ29tcG9uZW50LFxuICAgICAgICBNY01vZGFsVGl0bGUsXG4gICAgICAgIE1jTW9kYWxCb2R5LFxuICAgICAgICBNY01vZGFsRm9vdGVyXG4gICAgXSxcbiAgICBkZWNsYXJhdGlvbnM6IFtcbiAgICAgICAgTWNNb2RhbENvbXBvbmVudCxcbiAgICAgICAgTWNNb2RhbFRpdGxlLFxuICAgICAgICBNY01vZGFsQm9keSxcbiAgICAgICAgTWNNb2RhbEZvb3RlcixcbiAgICAgICAgQ3NzVW5pdFBpcGVcbiAgICBdLFxuICAgIGVudHJ5Q29tcG9uZW50czogW01jTW9kYWxDb21wb25lbnRdLFxuICAgIHByb3ZpZGVyczogW01jTW9kYWxDb250cm9sU2VydmljZSwgTWNNb2RhbFNlcnZpY2VdXG59KVxuZXhwb3J0IGNsYXNzIE1jTW9kYWxNb2R1bGUge31cbiJdfQ==