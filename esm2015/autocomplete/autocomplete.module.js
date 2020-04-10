/**
 * @fileoverview added by tsickle
 * Generated from: autocomplete.module.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { McOptionModule, McCommonModule } from '@ptsecurity/mosaic/core';
import { McAutocompleteOrigin } from './autocomplete-origin.directive';
import { McAutocompleteTrigger, MC_AUTOCOMPLETE_SCROLL_STRATEGY_FACTORY_PROVIDER } from './autocomplete-trigger.directive';
import { McAutocomplete } from './autocomplete.component';
export class McAutocompleteModule {
}
McAutocompleteModule.decorators = [
    { type: NgModule, args: [{
                imports: [McOptionModule, OverlayModule, McCommonModule, CommonModule],
                exports: [
                    McAutocomplete,
                    McOptionModule,
                    McAutocompleteTrigger,
                    McAutocompleteOrigin,
                    McCommonModule
                ],
                declarations: [McAutocomplete, McAutocompleteTrigger, McAutocompleteOrigin],
                providers: [MC_AUTOCOMPLETE_SCROLL_STRATEGY_FACTORY_PROVIDER]
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0b2NvbXBsZXRlLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BwdHNlY3VyaXR5L21vc2FpYy9hdXRvY29tcGxldGUvIiwic291cmNlcyI6WyJhdXRvY29tcGxldGUubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ3JELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxjQUFjLEVBQUUsY0FBYyxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFFekUsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFDdkUsT0FBTyxFQUNILHFCQUFxQixFQUNyQixnREFBZ0QsRUFDbkQsTUFBTSxrQ0FBa0MsQ0FBQztBQUMxQyxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFlMUQsTUFBTSxPQUFPLG9CQUFvQjs7O1lBWmhDLFFBQVEsU0FBQztnQkFDTixPQUFPLEVBQUUsQ0FBQyxjQUFjLEVBQUUsYUFBYSxFQUFFLGNBQWMsRUFBRSxZQUFZLENBQUM7Z0JBQ3RFLE9BQU8sRUFBRTtvQkFDTCxjQUFjO29CQUNkLGNBQWM7b0JBQ2QscUJBQXFCO29CQUNyQixvQkFBb0I7b0JBQ3BCLGNBQWM7aUJBQ2pCO2dCQUNELFlBQVksRUFBRSxDQUFDLGNBQWMsRUFBRSxxQkFBcUIsRUFBRSxvQkFBb0IsQ0FBQztnQkFDM0UsU0FBUyxFQUFFLENBQUMsZ0RBQWdELENBQUM7YUFDaEUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBPdmVybGF5TW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL292ZXJsYXknO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBNY09wdGlvbk1vZHVsZSwgTWNDb21tb25Nb2R1bGUgfSBmcm9tICdAcHRzZWN1cml0eS9tb3NhaWMvY29yZSc7XG5cbmltcG9ydCB7IE1jQXV0b2NvbXBsZXRlT3JpZ2luIH0gZnJvbSAnLi9hdXRvY29tcGxldGUtb3JpZ2luLmRpcmVjdGl2ZSc7XG5pbXBvcnQge1xuICAgIE1jQXV0b2NvbXBsZXRlVHJpZ2dlcixcbiAgICBNQ19BVVRPQ09NUExFVEVfU0NST0xMX1NUUkFURUdZX0ZBQ1RPUllfUFJPVklERVJcbn0gZnJvbSAnLi9hdXRvY29tcGxldGUtdHJpZ2dlci5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgTWNBdXRvY29tcGxldGUgfSBmcm9tICcuL2F1dG9jb21wbGV0ZS5jb21wb25lbnQnO1xuXG5cbkBOZ01vZHVsZSh7XG4gICAgaW1wb3J0czogW01jT3B0aW9uTW9kdWxlLCBPdmVybGF5TW9kdWxlLCBNY0NvbW1vbk1vZHVsZSwgQ29tbW9uTW9kdWxlXSxcbiAgICBleHBvcnRzOiBbXG4gICAgICAgIE1jQXV0b2NvbXBsZXRlLFxuICAgICAgICBNY09wdGlvbk1vZHVsZSxcbiAgICAgICAgTWNBdXRvY29tcGxldGVUcmlnZ2VyLFxuICAgICAgICBNY0F1dG9jb21wbGV0ZU9yaWdpbixcbiAgICAgICAgTWNDb21tb25Nb2R1bGVcbiAgICBdLFxuICAgIGRlY2xhcmF0aW9uczogW01jQXV0b2NvbXBsZXRlLCBNY0F1dG9jb21wbGV0ZVRyaWdnZXIsIE1jQXV0b2NvbXBsZXRlT3JpZ2luXSxcbiAgICBwcm92aWRlcnM6IFtNQ19BVVRPQ09NUExFVEVfU0NST0xMX1NUUkFURUdZX0ZBQ1RPUllfUFJPVklERVJdXG59KVxuZXhwb3J0IGNsYXNzIE1jQXV0b2NvbXBsZXRlTW9kdWxlIHt9XG4iXX0=