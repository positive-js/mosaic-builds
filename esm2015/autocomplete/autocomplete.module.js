/**
 * @fileoverview added by tsickle
 * Generated from: autocomplete.module.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0b2NvbXBsZXRlLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIvaG9tZS9jaXJjbGVjaS9tb3NhaWMvcGFja2FnZXMvbW9zYWljL2F1dG9jb21wbGV0ZS8iLCJzb3VyY2VzIjpbImF1dG9jb21wbGV0ZS5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDckQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLGNBQWMsRUFBRSxjQUFjLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUV6RSxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUN2RSxPQUFPLEVBQ0gscUJBQXFCLEVBQ3JCLGdEQUFnRCxFQUNuRCxNQUFNLGtDQUFrQyxDQUFDO0FBQzFDLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQWUxRCxNQUFNLE9BQU8sb0JBQW9COzs7WUFaaEMsUUFBUSxTQUFDO2dCQUNOLE9BQU8sRUFBRSxDQUFDLGNBQWMsRUFBRSxhQUFhLEVBQUUsY0FBYyxFQUFFLFlBQVksQ0FBQztnQkFDdEUsT0FBTyxFQUFFO29CQUNMLGNBQWM7b0JBQ2QsY0FBYztvQkFDZCxxQkFBcUI7b0JBQ3JCLG9CQUFvQjtvQkFDcEIsY0FBYztpQkFDakI7Z0JBQ0QsWUFBWSxFQUFFLENBQUMsY0FBYyxFQUFFLHFCQUFxQixFQUFFLG9CQUFvQixDQUFDO2dCQUMzRSxTQUFTLEVBQUUsQ0FBQyxnREFBZ0QsQ0FBQzthQUNoRSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE92ZXJsYXlNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jZGsvb3ZlcmxheSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE1jT3B0aW9uTW9kdWxlLCBNY0NvbW1vbk1vZHVsZSB9IGZyb20gJ0BwdHNlY3VyaXR5L21vc2FpYy9jb3JlJztcblxuaW1wb3J0IHsgTWNBdXRvY29tcGxldGVPcmlnaW4gfSBmcm9tICcuL2F1dG9jb21wbGV0ZS1vcmlnaW4uZGlyZWN0aXZlJztcbmltcG9ydCB7XG4gICAgTWNBdXRvY29tcGxldGVUcmlnZ2VyLFxuICAgIE1DX0FVVE9DT01QTEVURV9TQ1JPTExfU1RSQVRFR1lfRkFDVE9SWV9QUk9WSURFUlxufSBmcm9tICcuL2F1dG9jb21wbGV0ZS10cmlnZ2VyLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBNY0F1dG9jb21wbGV0ZSB9IGZyb20gJy4vYXV0b2NvbXBsZXRlLmNvbXBvbmVudCc7XG5cblxuQE5nTW9kdWxlKHtcbiAgICBpbXBvcnRzOiBbTWNPcHRpb25Nb2R1bGUsIE92ZXJsYXlNb2R1bGUsIE1jQ29tbW9uTW9kdWxlLCBDb21tb25Nb2R1bGVdLFxuICAgIGV4cG9ydHM6IFtcbiAgICAgICAgTWNBdXRvY29tcGxldGUsXG4gICAgICAgIE1jT3B0aW9uTW9kdWxlLFxuICAgICAgICBNY0F1dG9jb21wbGV0ZVRyaWdnZXIsXG4gICAgICAgIE1jQXV0b2NvbXBsZXRlT3JpZ2luLFxuICAgICAgICBNY0NvbW1vbk1vZHVsZVxuICAgIF0sXG4gICAgZGVjbGFyYXRpb25zOiBbTWNBdXRvY29tcGxldGUsIE1jQXV0b2NvbXBsZXRlVHJpZ2dlciwgTWNBdXRvY29tcGxldGVPcmlnaW5dLFxuICAgIHByb3ZpZGVyczogW01DX0FVVE9DT01QTEVURV9TQ1JPTExfU1RSQVRFR1lfRkFDVE9SWV9QUk9WSURFUl1cbn0pXG5leHBvcnQgY2xhc3MgTWNBdXRvY29tcGxldGVNb2R1bGUge31cbiJdfQ==